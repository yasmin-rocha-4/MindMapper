import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import "../css/home.css"; // Se o CSS do sidebar estiver aí, deixa assim

const Sidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <nav>
          <a href="#">Home</a>
          <a href="#">Calendário</a>
          <a href="#">Seus Mapas Mentais</a>
        </nav>
      </div>

      {/* Cabeçalho */}
      <div className="home-header">
        <button className="menu-button" onClick={toggleSidebar}>
          {sidebarOpen ? "✕" : "☰"}
        </button>
        <div className="user-info">
          <span className="user-name">{user?.displayName || user?.email || "Usuário"}</span>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Foto de perfil" />
          ) : (
            <div className="user-placeholder">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
