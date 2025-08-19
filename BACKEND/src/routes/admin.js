const express = require("express");
const router = express.Router();
const { poolPromise, sql } = require("../config/db");
const { v4: uuidv4 } = require("uuid"); // Arriba del archivo
const bcrypt = require("bcrypt"); // Asegúrate de tener bcrypt instalado

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

router.delete("/usuarios/:id", async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("IdUsuario", sql.UniqueIdentifier, req.params.id)
      .query("DELETE FROM Usuarios WHERE IdUsuario = @IdUsuario");
    // Registrar auditoría
    await pool.request()
      .input("Entidad", sql.NVarChar, "Usuarios")
      .input("TipoOperacion", sql.NVarChar, "DELETE")
      .input("UsuarioOperador", sql.NVarChar, req.user?.Correo || "admin")
      .input("DatosAfectados", sql.NVarChar(sql.MAX), JSON.stringify({ IdUsuario: req.params.id }))
      .query(`
        INSERT INTO Auditoria (Entidad, TipoOperacion, UsuarioOperador, DatosAfectados)
        VALUES (@Entidad, @TipoOperacion, @UsuarioOperador, @DatosAfectados)
      `);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Error eliminando usuario" });
  }
});

router.post("/usuarios", async (req, res) => {
  try {
    const { Nombre, Correo, Rol, ContraseñaHash } = req.body;
    // Validación de rol permitido
    const rolesPermitidos = ["administrador", "promotor", "ciudadano"];
    if (!rolesPermitidos.includes(Rol)) {
      return res.status(400).json({ error: "Rol no permitido" });
    }
    const IdUsuario = uuidv4();
    const hash = await bcrypt.hash(ContraseñaHash, 10); // Hashea la contraseña
    const pool = await poolPromise;
    const result = await pool.request()
      .input("IdUsuario", sql.UniqueIdentifier, IdUsuario)
      .input("Nombre", sql.VarChar, Nombre)
      .input("Correo", sql.VarChar, Correo)
      .input("Rol", sql.VarChar, Rol)
      .input("ContraseñaHash", sql.VarChar, hash)
      .query("INSERT INTO Usuarios (IdUsuario, Nombre, Correo, Rol, ContraseñaHash) OUTPUT INSERTED.* VALUES (@IdUsuario, @Nombre, @Correo, @Rol, @ContraseñaHash)");
    // ...después de crear el usuario...
    await pool.request()
      .input("Entidad", sql.NVarChar, "Usuarios")
      .input("TipoOperacion", sql.NVarChar, "INSERT")
      .input("UsuarioOperador", sql.NVarChar, req.user?.Correo || "admin")
      .input("DatosAfectados", sql.NVarChar(sql.MAX), JSON.stringify({ Nombre, Correo, Rol }))
      .query(`
        INSERT INTO Auditoria (Entidad, TipoOperacion, UsuarioOperador, DatosAfectados)
        VALUES (@Entidad, @TipoOperacion, @UsuarioOperador, @DatosAfectados)
      `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando usuario" });
  }
});

router.put("/usuarios/:id", async (req, res) => {
  try {
    const { Nombre, Correo, Rol } = req.body;
    // Validación de rol permitido
    const rolesPermitidos = ["administrador", "promotor", "ciudadano"];
    if (!rolesPermitidos.includes(Rol)) {
      return res.status(400).json({ error: "Rol no permitido" });
    }
    const pool = await poolPromise;
    await pool.request()
      .input("IdUsuario", sql.UniqueIdentifier, req.params.id)
      .input("Nombre", sql.VarChar, Nombre)
      .input("Correo", sql.VarChar, Correo)
      .input("Rol", sql.VarChar, Rol)
      .query("UPDATE Usuarios SET Nombre=@Nombre, Correo=@Correo, Rol=@Rol WHERE IdUsuario=@IdUsuario");
    // Registrar auditoría
    await pool.request()
      .input("Entidad", sql.NVarChar, "Usuarios")
      .input("TipoOperacion", sql.NVarChar, "UPDATE")
      .input("UsuarioOperador", sql.NVarChar, req.user?.Correo || "admin")
      .input("DatosAfectados", sql.NVarChar(sql.MAX), JSON.stringify({ IdUsuario: req.params.id, ...req.body }))
      .query(`
        INSERT INTO Auditoria (Entidad, TipoOperacion, UsuarioOperador, DatosAfectados)
        VALUES (@Entidad, @TipoOperacion, @UsuarioOperador, @DatosAfectados)
      `);
    res.json({ IdUsuario: req.params.id, Nombre, Correo, Rol });
  } catch (err) {
    res.status(500).json({ error: "Error editando usuario" });
  }
});

// Obtener todas las rutas
router.get("/rutas", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Rutas");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener rutas" });
  }
});

// Crear ruta
router.post("/rutas", async (req, res) => {
  try {
    const { Origen, Destino, TipoTransporte, DistanciaKm } = req.body;
    const IdRuta = uuidv4();
    const pool = await poolPromise;
    const result = await pool.request()
      .input("IdRuta", sql.UniqueIdentifier, IdRuta)
      .input("Origen", sql.NVarChar(100), Origen)
      .input("Destino", sql.NVarChar(100), Destino)
      .input("TipoTransporte", sql.NVarChar(50), TipoTransporte)
      .input("DistanciaKm", sql.Decimal(5, 2), DistanciaKm)
      .query("INSERT INTO Rutas (IdRuta, Origen, Destino, TipoTransporte, DistanciaKm) OUTPUT INSERTED.* VALUES (@IdRuta, @Origen, @Destino, @TipoTransporte, @DistanciaKm)");
    
    // --- REGISTRO EN AUDITORIA ---
    await pool.request()
      .input("Entidad", sql.NVarChar, "Rutas")
      .input("TipoOperacion", sql.NVarChar, "INSERT")
      .input("UsuarioOperador", sql.NVarChar, req.user?.Correo || "admin")
      .input("DatosAfectados", sql.NVarChar(sql.MAX), JSON.stringify({ IdRuta, Origen, Destino, TipoTransporte, DistanciaKm }))
      .query(`
        INSERT INTO Auditoria (Entidad, TipoOperacion, UsuarioOperador, DatosAfectados)
        VALUES (@Entidad, @TipoOperacion, @UsuarioOperador, @DatosAfectados)
      `);
    // --- FIN AUDITORIA ---

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al crear ruta" });
  }
});

// Editar ruta
router.put("/rutas/:id", async (req, res) => {
  try {
    const { Origen, Destino, TipoTransporte, DistanciaKm } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input("IdRuta", sql.UniqueIdentifier, req.params.id)
      .input("Origen", sql.NVarChar(100), Origen)
      .input("Destino", sql.NVarChar(100), Destino)
      .input("TipoTransporte", sql.NVarChar(50), TipoTransporte)
      .input("DistanciaKm", sql.Decimal(5, 2), DistanciaKm)
      .query("UPDATE Rutas SET Origen=@Origen, Destino=@Destino, TipoTransporte=@TipoTransporte, DistanciaKm=@DistanciaKm WHERE IdRuta=@IdRuta");
    
    // --- REGISTRO EN AUDITORIA ---
    await pool.request()
      .input("Entidad", sql.NVarChar, "Rutas")
      .input("TipoOperacion", sql.NVarChar, "UPDATE")
      .input("UsuarioOperador", sql.NVarChar, req.user?.Correo || "admin")
      .input("DatosAfectados", sql.NVarChar(sql.MAX), JSON.stringify({ IdRuta: req.params.id, Origen, Destino, TipoTransporte, DistanciaKm }))
      .query(`
        INSERT INTO Auditoria (Entidad, TipoOperacion, UsuarioOperador, DatosAfectados)
        VALUES (@Entidad, @TipoOperacion, @UsuarioOperador, @DatosAfectados)
      `);
    // --- FIN AUDITORIA ---

    res.json({ IdRuta: req.params.id, Origen, Destino, TipoTransporte, DistanciaKm });
  } catch (err) {
    res.status(500).json({ error: "Error al editar ruta" });
  }
});

// Eliminar ruta
router.delete("/rutas/:id", async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("IdRuta", sql.UniqueIdentifier, req.params.id)
      .query("DELETE FROM Rutas WHERE IdRuta = @IdRuta");

    // --- REGISTRO EN AUDITORIA ---
    await pool.request()
      .input("Entidad", sql.NVarChar, "Rutas")
      .input("TipoOperacion", sql.NVarChar, "DELETE")
      .input("UsuarioOperador", sql.NVarChar, req.user?.Correo || "admin")
      .input("DatosAfectados", sql.NVarChar(sql.MAX), JSON.stringify({ IdRuta: req.params.id }))
      .query(`
        INSERT INTO Auditoria (Entidad, TipoOperacion, UsuarioOperador, DatosAfectados)
        VALUES (@Entidad, @TipoOperacion, @UsuarioOperador, @DatosAfectados)
      `);
    // --- FIN AUDITORIA ---

    res.sendStatus(204);
  } catch (err) {
    if (err.originalError && err.originalError.info && err.originalError.info.number === 547) {
      return res.status(400).json({ error: "No se puede eliminar la ruta porque tiene viajes asociados." });
    }
    res.status(500).json({ error: "Error al eliminar ruta" });
  }
});

router.delete("/rutas/:id/forzar", async (req, res) => {
  try {
    const pool = await poolPromise;
    // Elimina los viajes asociados a la ruta
    await pool.request()
      .input("IdRuta", sql.UniqueIdentifier, req.params.id)
      .query("DELETE FROM Viajes WHERE IdRuta = @IdRuta");
    // Ahora elimina la ruta
    await pool.request()
      .input("IdRuta", sql.UniqueIdentifier, req.params.id)
      .query("DELETE FROM Rutas WHERE IdRuta = @IdRuta");
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar ruta y sus viajes asociados" });
  }
});

// KPIs principales
router.get("/reportes/kpis", async (req, res) => {
  try {
    const pool = await poolPromise;
    const usuarios = await pool.request().query("SELECT COUNT(*) as total FROM Usuarios");
    const rutas = await pool.request().query("SELECT COUNT(*) as total FROM Rutas");
    const viajes = await pool.request().query("SELECT COUNT(*) as total FROM Viajes");
    const co2 = await pool.request().query("SELECT ISNULL(SUM(CO2Evitado),0) as total FROM Viajes");
    res.json({
      usuarios: usuarios.recordset[0].total,
      rutas: rutas.recordset[0].total,
      viajes: viajes.recordset[0].total,
      co2: co2.recordset[0].total
    });
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo KPIs" });
  }
});

// Viajes por tipo de transporte
router.get("/reportes/viajes-por-transporte", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT r.TipoTransporte, COUNT(v.IdViaje) as total
      FROM Viajes v
      JOIN Rutas r ON v.IdRuta = r.IdRuta
      GROUP BY r.TipoTransporte
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo viajes por transporte" });
  }
});

// Viajes por mes (último año)
router.get("/reportes/viajes-por-mes", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT FORMAT(FechaViaje, 'yyyy-MM') as Mes, COUNT(*) as total
      FROM Viajes
      WHERE FechaViaje >= DATEADD(year, -1, GETDATE())
      GROUP BY FORMAT(FechaViaje, 'yyyy-MM')
      ORDER BY Mes
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo viajes por mes" });
  }
});

router.get("/actividad-reciente", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT TOP 10 Entidad, TipoOperacion, FechaOperacion, UsuarioOperador, DatosAfectados
      FROM Auditoria
      ORDER BY FechaOperacion DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo actividad reciente" });
  }
});

module.exports = router;