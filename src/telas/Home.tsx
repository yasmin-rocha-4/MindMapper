import React, { useState } from "react";
import Sidebar from "../Components/Sidebar"; 
import "../css/home.css";

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />

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
