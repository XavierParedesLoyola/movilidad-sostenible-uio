const { poolPromise, sql } = require("../config/db");

async function crearRuta({ IdRuta, Origen, Destino, TipoTransporte, DistanciaKm }) {
  const pool = await poolPromise;
  await pool.request()
    .input("IdRuta", sql.UniqueIdentifier, IdRuta)
    .input("Origen", sql.NVarChar(100), Origen)
    .input("Destino", sql.NVarChar(100), Destino)
    .input("TipoTransporte", sql.NVarChar(50), TipoTransporte)
    .input("DistanciaKm", sql.Decimal(5, 2), DistanciaKm)
    .execute("SP_CREAR_RUTA");
}

async function obtenerTodasLasRutas() {
  const pool = await poolPromise;
  const result = await pool.request()
    .execute("SP_OBTENER_TODAS_LAS_RUTAS");
  return result.recordset;
}

module.exports = {
  crearRuta,
  obtenerTodasLasRutas
};
