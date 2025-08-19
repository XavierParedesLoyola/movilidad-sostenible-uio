const { poolPromise, sql } = require("../config/db");

async function crearUsuario({ IdUsuario, Nombre, Correo, ContraseñaHash, Rol }) {
  const pool = await getConnection();
  await pool.request()
    .input("IdUsuario", sql.UniqueIdentifier, IdUsuario)
    .input("Nombre", sql.NVarChar(100), Nombre)
    .input("Correo", sql.NVarChar(100), Correo)
    .input("ContraseñaHash", sql.NVarChar(255), ContraseñaHash)
    .input("Rol", sql.NVarChar(20), Rol)
    .execute("SP_CREAR_USUARIO");
}
//Obtiene el usuario segun su correo
async function obtenerUsuarioPorCorreo(correo) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("Correo", sql.VarChar, correo)
    .query("SELECT * FROM Usuarios WHERE Correo = @Correo");
  return result.recordset[0];
}

module.exports = {
  crearUsuario,
  obtenerUsuarioPorCorreo
};
