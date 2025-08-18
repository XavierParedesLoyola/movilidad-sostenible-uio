const express = require("express");
const router = express.Router(); //Permite definir rutas, para luego montarlas en un archivo principal
const authController = require("../controllers/authController"); //Importa el controlador de la logica de autenticacion
const { verificarToken } = require("../middlewares/authMiddleware"); //Importa el middleware verifica el token JWT 

//#region RUTAS Api/Auth
router.post("/register", authController.register); //Usa la funcion register del controlador
router.post("/login", authController.login);

// Ruta protegida de prueba
router.get("/perfil", verificarToken, (req, res) => {
  res.json({ message: "Acceso permitido", usuario: req.user });
});

module.exports = router;
