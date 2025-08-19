import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/usuarios", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Usuarios Registrados</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Nombre</th>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Correo</th>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Rol</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usuarios) && usuarios.length > 0 ? (
              usuarios.map((u, idx) => (
                <tr
                  key={u.IdUsuario}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-3 text-gray-900">{u.Nombre}</td>
                  <td className="p-3 text-gray-900">{u.Correo}</td>
                  <td className="p-3">
                    <span className={
                      u.Rol === "admin"
                        ? "bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium"
                        : "bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium"
                    }>
                      {u.Rol}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}