const { v4: uuidv4 } = require("uuid");
const viajeModel = require("../models/viajeModel");

async function registrarViaje(req, res) {
  try {
    const { IdUsuario, IdRuta, FechaViaje, KmRecorridos, CO2Evitado } = req.body;
    const nuevoViaje = {
      IdViaje: uuidv4(),
      IdUsuario,
      IdRuta,
      FechaViaje,
      KmRecorridos,
      CO2Evitado
    };
    await viajeModel.registrarViaje(nuevoViaje);
    res.status(201).json({ message: "Viaje registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar viaje:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

async function obtenerViajesPorUsuario(req, res) {
  try {
    const { id } = req.params;
    const viajes = await viajeModel.obtenerViajesPorUsuario(id);
    res.json(viajes);
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

module.exports = {
  registrarViaje,
  obtenerViajesPorUsuario
};
