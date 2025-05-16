import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { configurarSessao } from "../utils/authSession";
import  BotaoAcao  from "../Components/BotaoAcao";
import  EntrarComGoogle from "../Components/EntrarComGoogle";
import  TrocarPaginaLogin  from "../Components/TrocarPaginaLogin";

import IconeEmail from "../assets/Icones/mail.svg";
import cadeado from "../assets/Icones/lock.svg";

import "../css/login.css";

interface LoginProps {
  titulo: string;
  descricao: string;
}

const Login: React.FC<LoginProps> = ({ titulo, descricao }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await configurarSessao();
  
      const credencialUsuario = await signInWithEmailAndPassword(auth, email, senha);
      console.log("Usuário logado:", credencialUsuario.user);
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro desconhecido ao tentar logar.");
      }
    }
  };
  
  return (
    <div className="container">
      {/* Cabeçalho */}
      <div className="cabecalho">
        <h1>{titulo}</h1>
        <h2>{descricao}</h2>
      </div>

      <div className="form-container">
        <form onSubmit={handleLogin}>
{/* Input para E-mail */}
        <div className="input-container">
        <img src={IconeEmail} alt="Ícone de e-mail" />
        <input
            className="form-control"
            placeholder="Digite seu e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="emailLogin"
        />
        </div>

        {/* Input para Senha */}
        <div className="input-container">
        <img src={cadeado} alt="Ícone de senha" />
        <input
            className="form-control"
            placeholder="Digite sua senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            id="senhaLogin"
        />
        </div>


          {/* Esqueci minha senha */}
          <p className="forgot-password">Esqueci a senha</p>

          {/* Botão para Logar */}
          <BotaoAcao className="botao-comando" funcao={handleLogin} comando="Login" />
        </form>

        {/* Exibição de Erro */}
        {error && <p className="erro-login">{error}</p>}
      </div>

      {/* Botão para Login com Google */}
      <EntrarComGoogle texto="Login com o google" />

      {/* Trocar para Página de Cadastro */}
      <TrocarPaginaLogin texto="Não tem uma conta?" textoLink="Cadastre-se aqui" />
    </div>
  );
};

export default Login;
