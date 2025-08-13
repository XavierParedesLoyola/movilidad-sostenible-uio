import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica de autenticación
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
  <h2 className="text-2xl font-bold mb-6 text-center text-black">Inicia sesión en tu cuenta</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Iniciar sesión</button>
      </form>
    </div>
  );
}