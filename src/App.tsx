import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login titulo="Bem Vindo" descricao="Conheça o melhor site para mapas mentais" />} />
        
        {/* Se digitar /Login (com L maiúsculo), redireciona para /login */}
        <Route path="/Login" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
