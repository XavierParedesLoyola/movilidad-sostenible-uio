import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de login aquí
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-600 rounded-full p-3 mb-2">
            <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-black">Inicia sesión en tu cuenta</h2>
          <p className="text-sm mt-1 text-gray-600">
            ¿No tienes cuenta? <a href="/register" className="text-green-600 font-semibold">Regístrate aquí</a>
          </p>
        </div>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full mb-4 p-2 border rounded text-black placeholder-gray-500"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-2 p-2 border rounded text-black placeholder-gray-500"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center text-sm text-black">
            <input type="checkbox" className="mr-2" />
            Recordarme
          </label>
          <a href="#" className="text-green-600 text-sm">¿Olvidaste tu contraseña?</a>
        </div>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2">Iniciar sesión</button>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-400 text-sm">O continúa con</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="flex gap-2">
          <button type="button" className="flex-1 border rounded py-2 flex items-center justify-center gap-2 text-black">
            <img src="/google.svg" alt="Google" className="w-5 h-5" /> Google
          </button>
          <button type="button" className="flex-1 border rounded py-2 flex items-center justify-center gap-2 text-black">
            <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" /> Facebook
          </button>
        </div>
        <a href="/" className="block text-center text-gray-500 text-sm mt-4">← Volver al inicio</a>
      </form>
    </div>
  );
}