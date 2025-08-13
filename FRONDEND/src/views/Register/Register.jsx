import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ nombre: "", apellido: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (form.password.length < 8) errs.password = "Mínimo 8 caracteres";
    if (!/[A-Z]/.test(form.password)) errs.password = "Debe tener una mayúscula";
    if (!/\d/.test(form.password)) errs.password = "Debe tener un número";
    if (form.password !== form.confirm) errs.confirm = "Las contraseñas no coinciden";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Lógica de registro aquí
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-600 rounded-full p-3 mb-2">
            <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-black">Crea tu cuenta</h2>
          <p className="text-sm mt-1 text-gray-600">
            ¿Ya tienes cuenta? <a href="/login" className="text-green-600 font-semibold">Inicia sesión aquí</a>
          </p>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            className="w-1/2 p-2 border rounded"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            className="w-1/2 p-2 border rounded"
            value={form.apellido}
            onChange={e => setForm({ ...form, apellido: e.target.value })}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full mb-4 p-2 border rounded"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-2 p-2 border rounded"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        {errors.password && <div className="text-red-500 text-sm mb-2">{errors.password}</div>}
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="w-full mb-2 p-2 border rounded"
          value={form.confirm}
          onChange={e => setForm({ ...form, confirm: e.target.value })}
          required
        />
        {errors.confirm && <div className="text-red-500 text-sm mb-2">{errors.confirm}</div>}
        <div className="flex items-center mb-4">
          <input type="checkbox" className="mr-2" required />
          <span className="text-sm text-gray-600">
            Acepto los <a href="#" className="text-green-600 underline">términos y condiciones</a> y la <a href="#" className="text-green-600 underline">política de privacidad</a>
          </span>
        </div>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2">Crear cuenta</button>
        <a href="/" className="block text-center text-gray-500 text-sm mt-4">← Volver al inicio</a>
      </form>
    </div>
  );
}