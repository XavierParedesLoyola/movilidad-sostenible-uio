import React, { useEffect, useState } from "react";
import { obtenerRutas } from "../../api/rutas";

export default function Ciudadano() {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    async function cargarRutas() {
      const data = await obtenerRutas();
      setRutas(data);
    }
    cargarRutas();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
          Bienvenido, Ciudadano
        </h2>
        <p className="text-center text-gray-700 mb-4">
          Aquí podrás ver tus rutas, registrar viajes y consultar tus
          estadísticas de movilidad sostenible.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rutas disponibles:</h3>
        <ul>
          {rutas.map((ruta) => (
            <li key={ruta.IdRuta} className="mb-1">
              {ruta.Origen} → {ruta.Destino} ({ruta.TipoTransporte}, {ruta.Distancia} km)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}