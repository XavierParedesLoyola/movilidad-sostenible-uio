export async function getDashboardStats() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/admin/dashboard-stats", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}