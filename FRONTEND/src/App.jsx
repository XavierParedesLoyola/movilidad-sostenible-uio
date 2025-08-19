import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Rutas from "./views/Rutas/Rutas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rutas" element={<Rutas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
