const bcrypt = require("bcrypt"); //Biblioteca para hashear contrasenas
const jwt = require("jsonwebtoken"); 
const { v4: uuidv4 } = require("uuid"); //Genera uuid version 4 
const usuarioModel = require("../models/usuarioModel"); //importo mi capa de acceso de datos (modelo)
const jwtConfig = require("../config/jwt");

async function register(req, res) {
  try {
    //Se define la estructura del JSON que el cliente debe enviar:
    const { Nombre, Correo, Contraseña, Rol } = req.body;

    //Valida si el correo existe
    const Correoexiste = await usuarioModel.obtenerUsuarioPorCorreo(Correo); //Llama al modelo y verifica si existe ese correo
    if (Correoexiste) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }
//Si no existe crea la clave con bycript
    const hash = await bcrypt.hash(Contraseña, 10); //Hashea la contrasena 10 es la cantidad de veces que se encripta
    const nuevoUsuario = { //Construye el objeto con los datos a guardar
      IdUsuario: uuidv4(),
      Nombre,
      Correo,
      ContraseñaHash: hash, //Guardamos el hash no la contrasena original
      Rol
    };

    const resultado = await usuarioModel.crearUsuario(nuevoUsuario); //Llamo al modelo para insertar en BDD
    console.log("Resultado crearUsuario:", resultado)
    res.status(201).json({ 
      message: "Usuario registrado con éxito"});
  
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

//Funcion para el LOGIN
async function login(req, res) {
  try {
    const { Correo, Contraseña } = req.body;
    const usuario = await usuarioModel.obtenerUsuarioPorCorreo(Correo);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const esValida = await bcrypt.compare(Contraseña, usuario.ContraseñaHash);
    if (!esValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.IdUsuario, rol: usuario.Rol },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

module.exports = { register, login };
