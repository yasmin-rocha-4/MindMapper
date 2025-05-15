import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import "../css/home.css";

const Home: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const user = getAuth().currentUser;

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="home-container">
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

      {/* Card principal */}
      <div className="upload-card">
        <h2>Gerar Mapa Mental</h2>

        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="file" className="select-button">
          {selectedFile ? selectedFile.name : "Selecionar arquivo"}
        </label>

        {selectedFile && (
          <div className="file-preview">
            <p>Pré-visualização:</p>
            <iframe
              src={URL.createObjectURL(selectedFile)}
              title="Pré-visualização do arquivo"
              className="preview-frame"
            ></iframe>
          </div>
        )}

        <button className="send-button" disabled={!selectedFile}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Home;
