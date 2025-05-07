import React, { useState } from "react";
import BotaoAcao from "../Components/BotaoAcao";
import EntrarComGoogle from "../Components/EntrarComGoogle";
import TrocarPaginaLogin from "../Components/TrocarPaginaLogin";
import iconeEmail from "../assets/Icones/mail.svg";
import cadeado from "../assets/Icones/lock.svg";
import "../css/login.css";  // Mantém o mesmo CSS
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";

interface CadastroProps {
  titulo: string;
  descricao: string;
}

const Cadastro: React.FC<CadastroProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuário cadastrado:", userCredential.user);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro desconhecido ao cadastrar");
      }
    }
  };

  return (
    <div className="container">
      {/* Cabeçalho */}
      <div className="cabecalho">
        <h1>{props.titulo}</h1>
        <h2>{props.descricao}</h2>
      </div>

      <div className="form-container">
        <form onSubmit={handleSignUp}>
          {/* Input para E-mail */}
          <div className="input-container">
            <img src={iconeEmail} alt="Ícone de e-mail" />
            <input
              className="form-control"
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="emailCadastro"
              required
            />
          </div>

          {/* Input para Senha */}
          <div className="input-container">
            <img src={cadeado} alt="Ícone de senha" />
            <input
              className="form-control"
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="senhaCadastro"
              required
            />
          </div>

          {/* Esqueci minha senha (se quiser deixar igual ao Login, pode remover daqui) */}
          {/* <p className="forgot-password">Esqueci a senha</p> */}

          {/* Botão para Cadastrar */}
          <BotaoAcao className="botao-comando" funcao={handleSignUp} comando="Cadastrar" />
        </form>

        {/* Exibição de Erro */}
        {error && <p className="erro-login">{error}</p>}
      </div>

      {/* Botão para Login com Google */}
      <EntrarComGoogle texto="Cadastre com o google" />

      {/* Trocar para página de Login */}
      <TrocarPaginaLogin texto="Já tem uma conta?" textoLink="Faça login aqui" />
    </div>
  );
};

export default Cadastro;
