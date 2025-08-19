export async function registrarViaje(datos) {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/viajes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(datos),
  });
  return response.json();
}

export async function obtenerViajesPorUsuario(idUsuario) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/api/viajes/usuario/${idUsuario}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return response.json();
}