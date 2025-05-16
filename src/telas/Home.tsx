import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import Sidebar from "../Components/Sidebar";
import UserInfo from "../Components/UserInfo";

import "../css/home.css";

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Usuário logado:", currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe(); // Limpeza do listener
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      {user && (
        <Sidebar
          user={user}
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
      )}

      {/* Cabeçalho */}
      <header className="home-header">
        <button className="menu-button" onClick={toggleSidebar}>
          {sidebarOpen ? "✕" : "☰"}
        </button>
        {user && <UserInfo user={user} />}
      </header>

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
