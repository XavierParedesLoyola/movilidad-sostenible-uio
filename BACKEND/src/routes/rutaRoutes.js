const express = require("express");
const router = express.Router();
const rutaController = require("../controllers/rutaController");
const { verificarToken } = require("../middlewares/authMiddleware");

// Crear una nueva ruta
router.post("/", verificarToken, rutaController.crearRuta);

// Listar todas las rutas
router.get("/", rutaController.listarRutas);

module.exports = router;
