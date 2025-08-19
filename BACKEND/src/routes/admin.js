const express = require("express");
const router = express.Router();
const { poolPromise } = require("../config/db");

router.get("/dashboard-stats", async (req, res) => {
  try {
    const pool = await poolPromise;
    const usuarios = await pool.request().query("SELECT COUNT(*) as total FROM Usuarios");
    const rutas = await pool.request().query("SELECT COUNT(*) as total FROM Rutas");
    const viajesHoy = await pool.request().query("SELECT COUNT(*) as total FROM Viajes WHERE CAST(FechaViaje AS DATE) = CAST(GETDATE() AS DATE)");
    const co2 = await pool.request().query("SELECT SUM(CO2Evitado) as total FROM Viajes WHERE MONTH(FechaViaje) = MONTH(GETDATE()) AND YEAR(FechaViaje) = YEAR(GETDATE())");

    res.json({
      usuarios: usuarios.recordset[0].total,
      rutas: rutas.recordset[0].total,
      viajesHoy: viajesHoy.recordset[0].total,
      co2: (co2.recordset[0].total || 0).toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo estadísticas" });
  }
});

router.get("/usuarios", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT IdUsuario, Nombre, Correo, Rol FROM Usuarios");
    res.json(result.recordset);
  } catch (err) {
    console.error(err); // <-- Esto te mostrará el error real en la terminal
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
});

module.exports = router;