import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Home from "./Home";
import '../App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login titulo="MindMapper" descricao="Conheça o melhor site para mapas mentais" />} />
        <Route path="/Login" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/cadastro" element={<Cadastro titulo="MindMapper" descricao="Conheça o melhor site para mapas mentais"/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
