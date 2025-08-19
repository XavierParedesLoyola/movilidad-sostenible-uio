const { getConnection, sql } = require("../config/db");

async function crearRuta({ IdRuta, Origen, Destino, TipoTransporte, DistanciaKm }) {
  const pool = await getConnection();
  await pool.request()
    .input("IdRuta", sql.UniqueIdentifier, IdRuta)
    .input("Origen", sql.NVarChar(100), Origen)
    .input("Destino", sql.NVarChar(100), Destino)
    .input("TipoTransporte", sql.NVarChar(50), TipoTransporte)
    .input("DistanciaKm", sql.Decimal(5, 2), DistanciaKm)
    .query(`INSERT INTO Rutas (IdRuta, Origen, Destino, TipoTransporte, DistanciaKm)
            VALUES (@IdRuta, @Origen, @Destino, @TipoTransporte, @DistanciaKm)`);
}

async function obtenerTodasLasRutas() {
  const pool = await getConnection();
  const result = await pool.request()
    .query("SELECT * FROM Rutas");
  return result.recordset;
}

module.exports = {
  crearRuta,
  obtenerTodasLasRutas
};
