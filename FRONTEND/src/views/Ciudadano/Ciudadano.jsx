import React, { useEffect, useState } from "react";
import { obtenerRutas } from "../../api/rutas";
import { registrarViaje, obtenerViajesPorUsuario } from "../../api/viajes";

export default function Ciudadano() {
  const [rutas, setRutas] = useState([]);
  const [viajes, setViajes] = useState([]);
  const [form, setForm] = useState({ IdRuta: "", FechaViaje: "", KmRecorridos: "" });
  const [mensaje, setMensaje] = useState("");
  const [estadisticas, setEstadisticas] = useState({ totalViajes: 0, totalKm: 0, totalCO2: 0 });

  const idUsuario = localStorage.getItem("idUsuario");

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

  // Ejemplo simple de cálculo de CO2 evitado (ajusta según tu lógica)
  const calcularCO2 = (km) => {
    return (parseFloat(km || 0) * 0.21).toFixed(2); // 0.21 es un ejemplo
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md text-gray-800">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
          Bienvenido, Ciudadano
        </h2>
        <p className="text-center text-gray-700 mb-4">
          Aquí podrás ver tus rutas, registrar viajes y consultar tus estadísticas de movilidad sostenible.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rutas disponibles:</h3>
        <ul className="text-gray-800">
          {rutas.map((ruta) => (
            <li key={ruta.IdRuta} className="mb-1">
              {ruta.Origen} → {ruta.Destino} ({ruta.TipoTransporte}, {ruta.Distancia} km)
            </li>
          ))}
        </ul>

        <hr className="my-4" />

        <h3 className="text-lg font-semibold mb-2">Registrar nuevo viaje:</h3>
        <form onSubmit={handleSubmit} className="mb-4">
          <select
            name="IdRuta"
            value={form.IdRuta}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded text-gray-800"
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
            className="w-full mb-2 p-2 border rounded text-gray-800"
            required
          />
          <input
            type="number"
            name="KmRecorridos"
            value={form.KmRecorridos}
            onChange={handleChange}
            placeholder="Km recorridos"
            className="w-full mb-2 p-2 border rounded text-gray-800"
            required
            min="0"
            step="0.1"
          />
          <input
            type="number"
            name="CO2Evitado"
            value={form.KmRecorridos ? calcularCO2(form.KmRecorridos) : ""}
            placeholder="CO₂ evitado (kg)"
            className="w-full mb-2 p-2 border rounded text-gray-800"
            disabled
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Registrar viaje
          </button>
        </form>
        {mensaje && <div className="text-center text-green-600 mb-2">{mensaje}</div>}

        <hr className="my-4" />

        <h3 className="text-lg font-semibold mb-2">Tus estadísticas:</h3>
        <ul className="mb-2 text-gray-800">
          <li>Total de viajes: {estadisticas.totalViajes}</li>
          <li>Total de km recorridos: {estadisticas.totalKm}</li>
          <li>Total de CO₂ evitado: {estadisticas.totalCO2} kg</li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">Historial de viajes:</h3>
        <ul className="text-gray-800">
          {viajes.map((viaje, idx) => (
            <li key={idx}>
              Ruta {viaje.IdRuta} - {viaje.KmRecorridos} km - {viaje.CO2Evitado} kg CO₂
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}