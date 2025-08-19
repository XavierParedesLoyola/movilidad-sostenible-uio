const { v4: uuidv4 } = require("uuid");
const rutaModel = require("../models/rutaModel");

async function crearRuta(req, res) {
  try {
    const { Origen, Destino, TipoTransporte, DistanciaKm } = req.body;
    const nuevaRuta = {
      IdRuta: uuidv4(),
      Origen,
      Destino,
      TipoTransporte,
      DistanciaKm
    };
    await rutaModel.crearRuta(nuevaRuta);
    res.status(201).json({ message: "Ruta creada con éxito" });
  } catch (error) {
    console.error("Error al crear ruta:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

async function listarRutas(req, res) {
  try {
    const rutas = await rutaModel.obtenerTodasLasRutas();
    res.json(rutas);
  } catch (error) {
    console.error("Error al listar rutas:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

module.exports = {
  crearRuta,
  listarRutas
};
