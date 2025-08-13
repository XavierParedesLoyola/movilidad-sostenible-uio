export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Panel de Administración</h1>
            <p className="text-gray-600">Resumen general del sistema EcoMovilidad</p>
          </div>
          <div className="text-right text-gray-500 text-sm">
            <div>Última actualización</div>
            <div className="font-semibold text-black">Hace 5 minutos</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-100 p-2 rounded-full">
              <svg width="20" height="20" fill="#2563eb" viewBox="0 0 24 24"><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z"/></svg>
            </span>
            <span className="text-gray-500">Usuarios Activos</span>
          </div>
          <div className="text-2xl font-bold text-black">1,247</div>
          <div className="text-green-600 text-xs mt-1">+12% este mes</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-100 p-2 rounded-full">
              <svg width="20" height="20" fill="#22c55e" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
            </span>
            <span className="text-gray-500">Rutas Registradas</span>
          </div>
          <div className="text-2xl font-bold text-black">89</div>
          <div className="text-green-600 text-xs mt-1">+3 esta semana</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-100 p-2 rounded-full">
              <svg width="20" height="20" fill="#a21caf" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
            </span>
            <span className="text-gray-500">Viajes Hoy</span>
          </div>
          <div className="text-2xl font-bold text-black">342</div>
          <div className="text-purple-600 text-xs mt-1">+8% vs ayer</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-100 p-2 rounded-full">
              <svg width="20" height="20" fill="#eab308" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
            </span>
            <span className="text-gray-500">CO₂ Ahorrado</span>
          </div>
          <div className="text-2xl font-bold text-black">2.1 T</div>
          <div className="text-yellow-600 text-xs mt-1">Este mes</div>
        </div>
      </div>

      {/* Tarjetas de gestión */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg p-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">Gestión de Usuarios</h3>
            <p>Administrar ciudadanos y promotores</p>
          </div>
          <button className="mt-4 bg-white text-blue-700 font-semibold rounded px-4 py-2 hover:bg-blue-50 transition">Ver usuarios</button>
        </div>
        <div className="rounded-lg p-6 bg-gradient-to-r from-green-600 to-green-400 text-white shadow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">Gestión de Rutas</h3>
            <p>Crear y administrar rutas sostenibles</p>
          </div>
          <button className="mt-4 bg-white text-green-700 font-semibold rounded px-4 py-2 hover:bg-green-50 transition">Gestionar rutas</button>
        </div>
        <div className="rounded-lg p-6 bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">Reportes</h3>
            <p>Análisis y estadísticas del sistema</p>
          </div>
          <button className="mt-4 bg-white text-purple-700 font-semibold rounded px-4 py-2 hover:bg-purple-50 transition">Ver reportes</button>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4 text-black">Actividad Reciente del Sistema</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-2">
            <span className="mt-1">
              <svg width="20" height="20" fill="#22c55e" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M10 13l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none"/></svg>
            </span>
            <div>
              <span className="font-semibold text-green-700">Nuevo usuario registrado</span>
              <div className="text-gray-600 text-sm">María González se registró como ciudadana • Hace 15 min</div>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">
              <svg width="20" height="20" fill="#2563eb" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2563eb"/><path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none"/></svg>
            </span>
            <div>
              <span className="font-semibold text-blue-700">Nueva ruta creada</span>
              <div className="text-gray-600 text-sm">Ruta "Parque La Carolina - PUCE" agregada por Admin • Hace 1 hora</div>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">
              <svg width="20" height="20" fill="#a21caf" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#a21caf"/><path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none"/></svg>
            </span>
            <div>
              <span className="font-semibold text-purple-700">Campaña activada</span>
              <div className="text-gray-600 text-sm">Promotor Carlos activó "Semana de la Bicicleta" • Hace 2 horas</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}