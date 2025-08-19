export async function obtenerRutas() {
  const response = await fetch("http://localhost:3000/api/rutas");
  return response.json();
}