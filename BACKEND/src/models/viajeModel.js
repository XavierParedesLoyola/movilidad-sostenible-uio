const { poolPromise, sql } = require("../config/db");

async function registrarViaje({ IdViaje, IdUsuario, IdRuta, FechaViaje, KmRecorridos, CO2Evitado }) {
  const pool = await poolPromise;
  await pool.request()
    .input("IdViaje", sql.UniqueIdentifier, IdViaje)
    .input("IdUsuario", sql.UniqueIdentifier, IdUsuario)
    .input("IdRuta", sql.UniqueIdentifier, IdRuta)
    .input("FechaViaje", sql.Date, FechaViaje)
    .input("KmRecorridos", sql.Decimal(5, 2), KmRecorridos)
    .input("CO2Evitado", sql.Decimal(6, 2), CO2Evitado)
    .execute("SP_REGISTRAR_VIAJE");
}

async function obtenerViajesPorUsuario(IdUsuario) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("IdUsuario", sql.UniqueIdentifier, IdUsuario)
    .execute("SP_OBTENER_VIAJES_POR_USUARIO");
  return result.recordset;
}

module.exports = {
  registrarViaje,
  obtenerViajesPorUsuario
};
