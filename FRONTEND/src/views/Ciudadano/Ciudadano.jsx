import React, { useEffect, useState } from "react";
import { obtenerRutas } from "../../api/rutas";
import { registrarViaje, obtenerViajesPorUsuario } from "../../api/viajes";
import LogoutButton from "../../components/LogoutButton"; // Ajusta la ruta si es necesario

export default function Ciudadano() {
  const [rutas, setRutas] = useState([]);
  const [viajes, setViajes] = useState([]);
  const [form, setForm] = useState({ IdRuta: "", FechaViaje: "", KmRecorridos: "" });
  const [mensaje, setMensaje] = useState("");
  const [estadisticas, setEstadisticas] = useState({ totalViajes: 0, totalKm: 0, totalCO2: 0 });

  const idUsuario = localStorage.getItem("idUsuario");
  const nombreUsuario = localStorage.getItem("nombreUsuario") || "Ciudadano";

  useEffect(() => {
    async function cargarRutas() {
      const data = await obtenerRutas();
      setRutas(data);
    }
    async function cargarViajes() {
      const data = await obtenerViajesPorUsuario(idUsuario);
      if (Array.isArray(data)) {
        setViajes(data);
        const totalViajes = data.length;
        const totalKm = data.reduce((sum, v) => sum + v.KmRecorridos, 0);
        const totalCO2 = data.reduce((sum, v) => sum + v.CO2Evitado, 0);
        setEstadisticas({ totalViajes, totalKm, totalCO2 });
      } else {
        setViajes([]);
        setEstadisticas({ totalViajes: 0, totalKm: 0, totalCO2: 0 });
        setMensaje(data.message || "No autorizado o error al cargar viajes");
      }
    }
    cargarRutas();
    cargarViajes();
  }, [idUsuario]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calcularCO2 = (km) => {
    return (parseFloat(km || 0) * 0.21).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Registrando viaje...");
    const datos = {
      IdUsuario: idUsuario,
      IdRuta: form.IdRuta,
      FechaViaje: form.FechaViaje,
      KmRecorridos: Number(form.KmRecorridos),
      CO2Evitado: Number(calcularCO2(form.KmRecorridos))
    };
    const res = await registrarViaje(datos);
    setMensaje(res.message || "Viaje registrado");
    const data = await obtenerViajesPorUsuario(idUsuario);
    if (Array.isArray(data)) {
      setViajes(data);
      const totalViajes = data.length;
      const totalKm = data.reduce((sum, v) => sum + v.KmRecorridos, 0);
      const totalCO2 = data.reduce((sum, v) => sum + v.CO2Evitado, 0);
      setEstadisticas({ totalViajes, totalKm, totalCO2 });
    } else {
      setViajes([]);
      setEstadisticas({ totalViajes: 0, totalKm: 0, totalCO2: 0 });
      setMensaje(data.message || "No autorizado o error al cargar viajes");
    }
    setForm({ IdRuta: "", FechaViaje: "", KmRecorridos: "" });
  };

  return (
    <div>
      <div className="flex justify-end p-4">
        <LogoutButton />
      </div>
      <div className="min-h-screen w-full bg-gray-100 flex flex-row gap-8 p-8">
        {/* Columna izquierda: rutas y formulario */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-8 rounded shadow text-gray-900">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Bienvenido, {nombreUsuario}
            </h2>
            <p className="text-gray-800 mb-4">
              Aquí podrás ver tus rutas, registrar viajes y consultar tus estadísticas de movilidad sostenible.
            </p>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Rutas disponibles:</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              {rutas.map((ruta) => (
                <div
                  key={ruta.IdRuta}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow flex flex-col"
                >
                  <span className="font-bold text-blue-800 text-lg">
                    {ruta.Origen} → {ruta.Destino}
                  </span>
                  <span className="text-sm text-gray-800 mb-1">
                    Tipo: <span className="font-semibold">{ruta.TipoTransporte}</span>
                  </span>
                  <span className="text-sm text-gray-800 mb-1">
                    Distancia: <span className="font-semibold">{ruta.Distancia} km</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded shadow text-gray-900">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Registrar nuevo viaje:</h3>
            <form onSubmit={handleSubmit} className="mb-4">
              <select
                name="IdRuta"
                value={form.IdRuta}
                onChange={handleChange}
                className="w-full mb-2 p-2 border rounded text-gray-900 bg-gray-50"
                required
              >
                <option value="">Selecciona una ruta</option>
                {rutas.map((ruta) => (
                  <option key={ruta.IdRuta} value={ruta.IdRuta}>
                    {ruta.Origen} → {ruta.Destino}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="FechaViaje"
                value={form.FechaViaje}
                onChange={handleChange}
                className="w-full mb-2 p-2 border rounded text-gray-900 bg-gray-50"
                required
              />
              <input
                type="number"
                name="KmRecorridos"
                value={form.KmRecorridos}
                onChange={handleChange}
                placeholder="Km recorridos"
                className="w-full mb-2 p-2 border rounded text-gray-900 bg-gray-50"
                required
                min="0"
                step="0.1"
              />
              <input
                type="number"
                name="CO2Evitado"
                value={form.KmRecorridos ? calcularCO2(form.KmRecorridos) : ""}
                placeholder="CO₂ evitado (kg)"
                className="w-full mb-2 p-2 border rounded text-gray-500 bg-gray-100"
                disabled
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Registrar viaje
              </button>
            </form>
            {mensaje && <div className="text-center text-green-600 mb-2">{mensaje}</div>}
          </div>
        </div>

        {/* Columna derecha: estadísticas e historial */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-8 rounded shadow text-gray-900">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Tus estadísticas:</h3>
            <ul className="mb-2 text-gray-900">
              <li>Total de viajes: {estadisticas.totalViajes}</li>
              <li>Total de km recorridos: {estadisticas.totalKm}</li>
              <li>Total de CO₂ evitado: {estadisticas.totalCO2} kg</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded shadow text-gray-900 flex-1">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Historial de viajes:</h3>
            <div className="grid grid-cols-1 gap-4 text-gray-900 max-h-96 overflow-y-auto">
              {viajes.map((viaje, idx) => {
                const ruta = rutas.find(r => r.IdRuta === viaje.IdRuta);
                return (
                  <div
                    key={idx}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow flex flex-col"
                  >
                    <span className="font-bold text-blue-800 text-lg mb-1">
                      {ruta ? `${ruta.Origen} → ${ruta.Destino}` : "Ruta desconocida"}
                    </span>
                    <span className="text-sm text-gray-800 mb-1">
                      Tipo: <span className="font-semibold">{ruta ? ruta.TipoTransporte : ""}</span>
                    </span>
                    <span className="text-sm text-gray-800 mb-1">
                      Fecha: <span className="font-semibold">{viaje.FechaViaje}</span>
                    </span>
                    <span className="text-sm text-gray-800 mb-1">
                      Distancia: <span className="font-semibold">{viaje.KmRecorridos} km</span>
                    </span>
                    <span className="text-sm text-gray-800">
                      CO₂ evitado: <span className="font-semibold">{viaje.CO2Evitado} kg</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}