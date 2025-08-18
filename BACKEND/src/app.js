require("dotenv").config(); // Para cargar variables de entorno

const express = require("express"); // Framework para construir servidores web
const cors = require("cors"); // Middleware permite solicitudes desde otros dominios

const authRoutes = require("./routes/authRoutes"); // Importa las rutas
const { getConnection } = require("./config/db"); // Importa la función de conexión a la BDD

const app = express(); // Crea una instancia de express

//#region Middlewares Globales 
app.use(cors());
app.use(express.json()); // Procesa cuerpos JSON
//#endregion

//#region Rutas

// Definición de rutas
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
