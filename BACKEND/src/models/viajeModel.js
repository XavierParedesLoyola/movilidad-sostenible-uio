const { getConnection, sql } = require("../config/db");

async function registrarViaje({ IdViaje, IdUsuario, IdRuta, FechaViaje, KmRecorridos, CO2Evitado }) {
  const pool = await getConnection();
  await pool.request()
    .input("IdViaje", sql.UniqueIdentifier, IdViaje)
    .input("IdUsuario", sql.UniqueIdentifier, IdUsuario)
    .input("IdRuta", sql.UniqueIdentifier, IdRuta)
    .input("FechaViaje", sql.Date, FechaViaje)
    .input("KmRecorridos", sql.Decimal(5, 2), KmRecorridos)
    .input("CO2Evitado", sql.Decimal(6, 2), CO2Evitado)
    .query(`INSERT INTO Viajes (IdViaje, IdUsuario, IdRuta, FechaViaje, KmRecorridos, CO2Evitado)
            VALUES (@IdViaje, @IdUsuario, @IdRuta, @FechaViaje, @KmRecorridos, @CO2Evitado)`);
}

async function obtenerViajesPorUsuario(IdUsuario) {
  const pool = await getConnection();
  const result = await pool.request()
    .input("IdUsuario", sql.UniqueIdentifier, IdUsuario)
    .query("SELECT * FROM Viajes WHERE IdUsuario = @IdUsuario");
  return result.recordset;
}

module.exports = {
  registrarViaje,
  obtenerViajesPorUsuario
};
