import React from "react";
import google from "../assets/Icones/google.png";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/Firebase";

import "../css/entrarComGoogle.css";

interface EntrarComGoogleProps {
  texto: string;
}

const EntrarComGoogle: React.FC<EntrarComGoogleProps> = ({ texto }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Usuário logado:", result.user);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao logar com o Google:", error.message);
      } else {
        console.error("Erro desconhecido ao logar com o Google");
      }
    }
  };

  return (
    <div className="google-container">
      <button onClick={handleLogin} className="google-button">
        <img src={google} alt="icone google" className="google-icon" />
        <p>{texto}</p>
      </button>
    </div>
  );
};

export default EntrarComGoogle;
