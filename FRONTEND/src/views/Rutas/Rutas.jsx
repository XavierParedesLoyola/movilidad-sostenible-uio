import { useEffect, useState } from "react";

export default function Rutas() {
  const [rutas, setRutas] = useState([]);
  const [rutaEditar, setRutaEditar] = useState(null);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/rutas", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setRutas(data));
  }, []);

  const eliminarRuta = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta ruta?")) return;
    const res = await fetch(`http://localhost:3000/api/admin/rutas/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    if (res.status === 204) {
      setRutas(rutas.filter(r => r.IdRuta !== id));
    } else {
      const data = await res.json();
      alert(data.error || "Error al eliminar ruta");
    }
  };

  async function guardarRuta() {
    // Validaciones
    const nuevosErrores = {};
    if (!rutaEditar.Origen) nuevosErrores.Origen = "El origen es obligatorio";
    if (!rutaEditar.Destino) nuevosErrores.Destino = "El destino es obligatorio";
    if (!rutaEditar.TipoTransporte) nuevosErrores.TipoTransporte = "El tipo de transporte es obligatorio";
    if (!rutaEditar.DistanciaKm || isNaN(rutaEditar.DistanciaKm) || Number(rutaEditar.DistanciaKm) <= 0)
      nuevosErrores.DistanciaKm = "La distancia debe ser un número mayor a 0";

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const esNueva = !rutaEditar.IdRuta;
    const url = esNueva
      ? "http://localhost:3000/api/admin/rutas"
      : `http://localhost:3000/api/admin/rutas/${rutaEditar.IdRuta}`;
    const method = esNueva ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(rutaEditar)
    });
    if (res.ok) {
      const nueva = esNueva ? await res.json() : rutaEditar;
      setRutas(esNueva ? [...rutas, nueva] : rutas.map(r => r.IdRuta === rutaEditar.IdRuta ? rutaEditar : r));
      setRutaEditar(null);
      setErrores({});
    } else {
      alert("Error al guardar ruta");
    }
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Rutas Registradas</h2>
      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => setRutaEditar({ Origen: "", Destino: "", TipoTransporte: "", DistanciaKm: "" })}
      >
        Nueva ruta
      </button>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Origen</th>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Destino</th>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Transporte</th>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Distancia (km)</th>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(rutas) && rutas.length > 0 ? (
              rutas.map((r, idx) => (
                <tr key={r.IdRuta} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 text-gray-900">{r.Origen}</td>
                  <td className="p-3 text-gray-900">{r.Destino}</td>
                  <td className="p-3 text-gray-900">{r.TipoTransporte}</td>
                  <td className="p-3 text-gray-900">{r.DistanciaKm}</td>
                  <td className="p-3">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm mr-2"
                      onClick={() => setRutaEditar(r)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      onClick={() => eliminarRuta(r.IdRuta)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No hay rutas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {rutaEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">{rutaEditar.IdRuta ? "Editar Ruta" : "Nueva Ruta"}</h3>
            <input
              className="w-full mb-2 p-2 border rounded"
              name="Origen"
              value={rutaEditar.Origen}
              onChange={e => setRutaEditar({ ...rutaEditar, Origen: e.target.value })}
              placeholder="Origen"
            />
            {errores.Origen && <div className="text-red-600 text-sm mb-2">{errores.Origen}</div>}
            <input
              className="w-full mb-2 p-2 border rounded"
              name="Destino"
              value={rutaEditar.Destino}
              onChange={e => setRutaEditar({ ...rutaEditar, Destino: e.target.value })}
              placeholder="Destino"
            />
            {errores.Destino && <div className="text-red-600 text-sm mb-2">{errores.Destino}</div>}
            <select
              className="w-full mb-2 p-2 border rounded"
              name="TipoTransporte"
              value={rutaEditar.TipoTransporte}
              onChange={e => setRutaEditar({ ...rutaEditar, TipoTransporte: e.target.value })}
            >
              <option value="">Selecciona tipo de transporte</option>
              <option value="bicicleta">Bicicleta</option>
              <option value="transporte público">Transporte público</option>
              <option value="peatonal">Peatonal</option>
              <option value="otro">Otro</option>
            </select>
            {errores.TipoTransporte && <div className="text-red-600 text-sm mb-2">{errores.TipoTransporte}</div>}
            <input
              className="w-full mb-4 p-2 border rounded"
              name="DistanciaKm"
              type="number"
              value={rutaEditar.DistanciaKm}
              onChange={e => setRutaEditar({ ...rutaEditar, DistanciaKm: e.target.value })}
              placeholder="Distancia (km)"
            />
            {errores.DistanciaKm && <div className="text-red-600 text-sm mb-2">{errores.DistanciaKm}</div>}
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setRutaEditar(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={guardarRuta}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}