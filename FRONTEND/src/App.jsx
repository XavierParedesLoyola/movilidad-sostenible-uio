import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Rutas from "./views/Rutas/Rutas";
import Ciudadano from "./views/Ciudadano/Ciudadano";
import Promotor from "./views/Promotor/Promotor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rutas" element={<Rutas />} />
        <Route path="/ciudadano" element={<Ciudadano />} />
        <Route path="/promotor" element={<Promotor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
