import React, { useState } from "react";
import { registerUsuario } from "../../api/auth";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";

function Register() {
  const [form, setForm] = useState({
    Nombre: "",
    Correo: "",
    Contraseña: "",
    ConfirmarContraseña: "",
    Rol: ""
  });
  const [mensaje, setMensaje] = useState("");

  const roles = [
    { label: "ciudadano", value: "ciudadano" },
    { label: "promotor", value: "promotor" }
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUsuario(form);
    setMensaje(res.message);
  };

  const inputStyle = {
    backgroundColor: "#181818",
    color: "#b0b0b0",
    border: "solid #333",
    borderRadius: "6px",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    width: "100%", 
    boxSizing: "border-box"
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-500 rounded-full p-4 mb-2 flex items-center justify-center" style={{ width: 56, height: 56 }}>
            <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="none"/>
              <path d="M9.5 16.5l-4-4 1.41-1.41L9.5 13.67l7.09-7.09L18 8l-8.5 8.5z" style={{ stroke: "white", strokeWidth: 2, fill: "white" }} />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center mb-1 text-black">Crea tu cuenta</h2>
          <p className="text-gray-500 text-center text-sm">
            ¿Ya tienes cuenta? <a href="/login" className="text-green-600 font-semibold hover:underline">Inicia sesión aquí</a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <InputText
              id="Nombre"
              name="Nombre"
              value={form.Nombre}
              onChange={handleChange}
              required
              placeholder="Nombre"
              style={inputStyle}
              className="focus:ring-2 focus:ring-green-500 w-full"
            />
          </div>
          <div>
            <InputText
              id="Correo"
              name="Correo"
              value={form.Correo}
              onChange={handleChange}
              required
              placeholder="Correo electrónico"
              style={inputStyle}
              className="focus:ring-2 focus:ring-green-500 w-full"
            />
          </div>
          <div style={{ width: "100%" }}>
            <Password
              id="Contraseña"
              name="Contraseña"
              value={form.Contraseña}
              onChange={handleChange}
              required
              placeholder="Contraseña"
              inputStyle={{ ...inputStyle, width: "175%" }}
              className="w-full"
              inputClassName="w-full"
              feedback={false}
              toggleMask
            />
          </div>
          <div style={{ width: "100%" }}>
            <Password
              id="ConfirmarContraseña"
              name="ConfirmarContraseña"
              value={form.ConfirmarContraseña}
              onChange={handleChange}
              required
              placeholder="Confirmar contraseña"
              inputStyle={{ ...inputStyle, width: "175%" }}
              className="w-full"
              inputClassName="w-full"
              feedback={false}
              toggleMask
            />
          </div>
          <div>
            <Dropdown
              id="Rol"
              name="Rol"
              value={form.Rol}
              options={roles}
              onChange={(e) => setForm({ ...form, Rol: e.value })}
              placeholder="Selecciona el rol"
              className="w-full"
              style={{ ...inputStyle, minHeight: "56px", borderRadius: "12px" }} 
              required
              panelStyle={{ backgroundColor: "#181818", borderRadius: "12px", minWidth: "100%", padding: "8px 0" }} 
              itemTemplate={(option) => (
                <span style={{ color: "#b0b0b0", display: "block", padding: "12px 24px", fontSize: "1rem" }}>
                  {option.label}
                </span>
              )}
            />
          </div>
          <Button type="submit" label="Registrarse" className="w-full bg-green-500 border-0 mt-2" />
          {mensaje && (
            <div className="text-center text-green-600 font-semibold mt-2">{mensaje}</div>
          )}
        </form>
        <Divider className="my-6" />
        <div className="text-center">
          <a href="/" className="text-gray-500 hover:underline text-sm">← Volver al inicio</a>
        </div>
      </div>
    </div>
  );
}

export default Register;