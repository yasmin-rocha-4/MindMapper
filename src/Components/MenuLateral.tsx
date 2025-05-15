// src/components/MenuLateral.tsx
import React from "react";

interface MenuProps {
  onNavigate: (rota: string) => void;
}

const MenuLateral: React.FC<MenuProps> = ({ onNavigate }) => {
  return (
    <div className="menu-lateral">
      <button onClick={() => onNavigate("home")}>🏠 Home</button>
      <button onClick={() => onNavigate("calendario")}>📅 Calendário</button>
      <button onClick={() => onNavigate("mapas")}>🧠 Seus Mapas Mentais</button>
    </div>
  );
};

export default MenuLateral;
