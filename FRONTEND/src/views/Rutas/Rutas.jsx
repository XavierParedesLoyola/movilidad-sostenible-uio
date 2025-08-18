import { useState, useEffect } from "react";

export default function Rutas() {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRutas() {
      setTimeout(() => {
        setRutas([
          { id: 1, origen: "Centro", destino: "Norte", transporte: "Bicicleta", distancia: 5.2 },
          { id: 2, origen: "Sur", destino: "Centro", transporte: "Bus", distancia: 8.1 },
        ]);
        setLoading(false);
      }, 800);
    }
    fetchRutas();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8">
      <div className="bg-white p-8 rounded shadow w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">Rutas Sostenibles</h2>
        {loading ? (
          <div className="text-center text-gray-500">Cargando rutas...</div>
        ) : rutas.length === 0 ? (
          <div className="text-center text-gray-500">No hay rutas registradas.</div>
        ) : (
          <table className="w-full border-collapse text-gray-800">
            <thead>
              <tr className="bg-green-100">
                <th className="py-2 px-4 border-b text-left">Origen</th>
                <th className="py-2 px-4 border-b text-left">Destino</th>
                <th className="py-2 px-4 border-b text-left">Transporte</th>
                <th className="py-2 px-4 border-b text-left">Distancia (km)</th>
              </tr>
            </thead>
            <tbody>
              {rutas.map((ruta) => (
                <tr key={ruta.id} className="hover:bg-green-50">
                  <td className="py-2 px-4 border-b">{ruta.origen}</td>
                  <td className="py-2 px-4 border-b">{ruta.destino}</td>
                  <td className="py-2 px-4 border-b">{ruta.transporte}</td>
                  <td className="py-2 px-4 border-b">{ruta.distancia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}