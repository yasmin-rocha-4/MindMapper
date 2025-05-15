// src/components/CardUpload.tsx
import React from "react";

interface CardUploadProps {
  onFileUpload: (file: File) => void;
}

const CardUpload: React.FC<CardUploadProps> = ({ onFileUpload }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
  };

  return (
    <div className="card-upload">
      <h2>Gerar Mapa Mental</h2>
      <input type="file" accept="audio/*,video/*,.txt,.pdf" onChange={handleChange} />
    </div>
  );
};

export default CardUpload;
