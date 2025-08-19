import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/usuarios", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []);

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    const res = await fetch(`http://localhost:3000/api/admin/usuarios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    if (res.ok) {
      setUsuarios(usuarios.filter(u => u.IdUsuario !== id));
    } else {
      alert("Error al eliminar usuario");
    }
  };

  async function guardarEdicion() {
    const esNuevo = !usuarioEditar.IdUsuario;
    const url = esNuevo
      ? "http://localhost:3000/api/admin/usuarios"
      : `http://localhost:3000/api/admin/usuarios/${usuarioEditar.IdUsuario}`;
    const method = esNuevo ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(usuarioEditar)
    });
    if (res.ok) {
      const nuevo = esNuevo ? await res.json() : usuarioEditar;
      setUsuarios(esNuevo ? [...usuarios, nuevo] : usuarios.map(u => u.IdUsuario === usuarioEditar.IdUsuario ? usuarioEditar : u));
      setUsuarioEditar(null);
    } else {
      alert("Error al guardar usuario");
    }
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Usuarios Registrados</h2>
      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => setUsuarioEditar({ Nombre: "", Correo: "", Rol: "administrador" })}
      >
        Nuevo usuario
      </button>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Nombre</th>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Correo</th>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Rol</th>
              <th className="p-3 text-left text-gray-700 font-semibold bg-blue-100">Acciones</th> {/* Nueva columna */}
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
                  <td className="p-3">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm mr-2"
                      onClick={() => setUsuarioEditar(u)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      onClick={() => eliminarUsuario(u.IdUsuario)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {usuarioEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Editar Usuario</h3>
            <input
              className="w-full mb-2 p-2 border rounded"
              name="Nombre"
              value={usuarioEditar.Nombre}
              onChange={e => setUsuarioEditar({ ...usuarioEditar, Nombre: e.target.value })}
              placeholder="Nombre"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              name="Correo"
              value={usuarioEditar.Correo}
              onChange={e => setUsuarioEditar({ ...usuarioEditar, Correo: e.target.value })}
              placeholder="Correo"
            />
            <select
              className="w-full mb-4 p-2 border rounded"
              name="Rol"
              value={usuarioEditar.Rol}
              onChange={e => setUsuarioEditar({ ...usuarioEditar, Rol: e.target.value })}
            >
              <option value="administrador">administrador</option>
              <option value="promotor">promotor</option>
              <option value="ciudadano">ciudadano</option>
            </select>
            {!usuarioEditar.IdUsuario && (
              <input
                className="w-full mb-2 p-2 border rounded"
                name="ContraseñaHash"
                type="password"
                value={usuarioEditar.ContraseñaHash || ""}
                onChange={e => setUsuarioEditar({ ...usuarioEditar, ContraseñaHash: e.target.value })}
                placeholder="Contraseña"
              />
            )}
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setUsuarioEditar(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={guardarEdicion}
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