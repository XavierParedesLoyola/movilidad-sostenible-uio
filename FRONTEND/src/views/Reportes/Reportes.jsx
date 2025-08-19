import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

export default function Reportes() {
  const [kpis, setKpis] = useState({ usuarios: 0, rutas: 0, viajes: 0, co2: 0 });
  const [porTransporte, setPorTransporte] = useState([]);
  const [porMes, setPorMes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/reportes/kpis", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => res.json()).then(setKpis);

    fetch("http://localhost:3000/api/admin/reportes/viajes-por-transporte", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => res.json()).then(setPorTransporte);

    fetch("http://localhost:3000/api/admin/reportes/viajes-por-mes", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => res.json()).then(setPorMes);
  }, []);

  // Datos para gráfica de pastel (viajes por transporte)
  const pieData = {
    labels: porTransporte.map(t => t.TipoTransporte),
    datasets: [{
      data: porTransporte.map(t => t.total),
      backgroundColor: ["#6366f1", "#22d3ee", "#f59e42", "#f43f5e", "#84cc16"]
    }]
  };

  // Datos para gráfica de líneas (viajes por mes)
  const lineData = {
    labels: porMes.map(m => m.Mes),
    datasets: [{
      label: "Viajes por mes",
      data: porMes.map(m => m.total),
      fill: false,
      borderColor: "#6366f1",
      backgroundColor: "#6366f1",
      tension: 0.2
    }]
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => navigate(-1)}
        >
          Volver atrás
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("rol");
            window.location.href = "/login";
          }}
        >
          Cerrar sesión
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-purple-800">Reportes y Estadísticas</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-700 mb-2">Usuarios</div>
          <div className="text-2xl font-bold text-black">{kpis.usuarios}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-700 mb-2">Rutas</div>
          <div className="text-2xl font-bold text-black">{kpis.rutas}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-700 mb-2">Viajes</div>
          <div className="text-2xl font-bold text-black">{kpis.viajes}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-700 mb-2">CO₂ evitado (kg)</div>
          <div className="text-2xl font-bold text-black">{kpis.co2}</div>
        </div>
      </div>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-xl font-semibold mb-2 text-purple-700">Viajes por tipo de transporte</h3>
          <Pie data={pieData} />
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-xl font-semibold mb-2 text-purple-700">Viajes por mes (último año)</h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
}