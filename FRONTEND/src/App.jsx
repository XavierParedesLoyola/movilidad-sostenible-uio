import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Rutas from "./views/Rutas/Rutas";
import Ciudadano from "./views/Ciudadano/Ciudadano";
import Promotor from "./views/Promotor/Promotor";
import Dashboard from "./views/Dashboard/Dashboard";
import Home from "./views/Home/Home";
import Usuarios from "./views/Usuarios/Usuarios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página principal */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rutas" element={<Rutas />} />
        <Route path="/ciudadano" element={<Ciudadano />} />
        <Route path="/promotor" element={<Promotor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
