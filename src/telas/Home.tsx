import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import Sidebar from "../Components/Sidebar";
import UserInfo from "../Components/UserInfo";
import { sendFileToServer } from "../api/uploadApi";
import Mermaid from "../Components/Mermaid";
import "../css/home.css";
import html2canvas from "html2canvas";
//import jsPDF from "jspdf";

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [mindMap, setMindMap] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSend = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const result = await sendFileToServer(selectedFile);
      setMindMap(result);

      // Limpa input e visualização
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      alert("Erro ao gerar mapa mental: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Baixar como imagem PNG

const handleDownloadPNG = async () => {
  const element = document.getElementById("mindmap-result");
  if (!element) return;

  // Aumenta a escala para capturar com alta resolução
  const canvas = await html2canvas(element, {
    scale: 3, // Aumente conforme necessário 
    useCORS: true,
    backgroundColor: "#ffffff", // Evita fundo transparente
  });

  const imgData = canvas.toDataURL("image/png");

  // Cria um link para download
  const link = document.createElement("a");
  link.href = imgData;
  link.download = "mapa-mental.png";
  link.click();
};


  // Baixar como PDF

  return (
    <div className="home-container">
      {user && (
        <Sidebar user={user} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      )}

      <header className="home-header">
        <button className="menu-button" onClick={toggleSidebar}>
          {sidebarOpen ? "✕" : "☰"}
        </button>
        {user && <UserInfo user={user} />}
      </header>

      <div className="upload-card">
        <h2>Gerar Mapa Mental</h2>

        <input
          ref={fileInputRef}
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
            />
          </div>
        )}

        <button className="send-button" onClick={handleSend} disabled={!selectedFile || loading}>
          {loading ? "Gerando..." : "Enviar"}
        </button>
      </div>

      {mindMap && (
        <div className="mindmap-container">
          <h3>🧠 Mapa Mental Visual</h3>
          <div id="mindmap-result" className="mindmap-box">
            <Mermaid chart={mindMap} />
            

          </div>

          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button onClick={handleDownloadPNG}>📷 Baixar como PNG</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
