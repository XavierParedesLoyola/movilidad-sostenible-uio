export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Usuarios Activos</div>
          <div className="text-2xl font-bold">1,247</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Rutas Registradas</div>
          <div className="text-2xl font-bold">89</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Viajes Hoy</div>
          <div className="text-2xl font-bold">342</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">CO₂ Ahorrado</div>
          <div className="text-2xl font-bold">2.1 T</div>
        </div>
      </div>
      {/* Más secciones aquí */}
    </div>
  );
}