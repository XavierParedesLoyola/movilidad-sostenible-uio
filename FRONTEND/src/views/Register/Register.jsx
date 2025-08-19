import React, { useState } from "react";
import { registerUsuario } from "../../api/auth";

function Register() {
  const [form, setForm] = useState({
    Nombre: "",
    Correo: "",
    Contraseña: "",
    Rol: ""
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUsuario(form);
    setMensaje(res.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="Nombre"
        value={form.Nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        name="Correo"
        value={form.Correo}
        onChange={handleChange}
        placeholder="Correo"
        required
      />
      <input
        name="Contraseña"
        type="password"
        value={form.Contraseña}
        onChange={handleChange}
        placeholder="Contraseña"
        required
      />
      <input
        name="Rol"
        value={form.Rol}
        onChange={handleChange}
        placeholder="Rol"
        required
      />
      <button type="submit">Registrar</button>
      <div>{mensaje}</div>
    </form>
  );
}

export default Register;