import React from "react";
import SidebarButton from "./SidebarButton"; // o botão menor que fizemos
import { User, getAuth } from "firebase/auth";

interface SidebarProps {
  user: User | null;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ user, toggleSidebar, sidebarOpen }) => {
    console.log("Sidebar user:", user);
  const handleLogout = async () => {
    const auth = getAuth();
    await auth.signOut();
    window.location.href = "/login"; // redireciona após logout
  };

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <nav>
        <a href="#" onClick={toggleSidebar}>Home</a>
        <a href="#" onClick={toggleSidebar}>Calendário</a>
        <a href="#" onClick={toggleSidebar}>Seus Mapas Mentais</a>
      </nav>



      <SidebarButton comando="Sair" funcao={handleLogout} />
    </div>
  );
};

export default Sidebar;
