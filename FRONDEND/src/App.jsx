import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
