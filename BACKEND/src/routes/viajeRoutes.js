const express = require("express");
const router = express.Router();
const viajeController = require("../controllers/viajeController");
const { verificarToken } = require("../middlewares/authMiddleware");

// Registrar un nuevo viaje
router.post("/", verificarToken, viajeController.registrarViaje);

// Obtener viajes por usuario
router.get("/usuario/:id", verificarToken, viajeController.obtenerViajesPorUsuario);

module.exports = router;
