import React from "react";

export default function Ciudadano() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">Bienvenido, Ciudadano</h2>
        <p className="text-center text-gray-700">
          Aquí podrás ver tus rutas, registrar viajes y consultar tus estadísticas de movilidad sostenible.
        </p>
        {/* Aquí puedes agregar más componentes o lógica según lo que necesites */}
      </div>
    </div>
  );
}