import React, { useState } from "react";
import BotaoAcao from "../Components/BotaoAcao";
import EntrarComGoogle from "../Components/EntrarComGoogle";
import TrocarPaginaLogin from "../Components/TrocarPaginaLogin";
import iconeEmail from "../assets/Icones/mail.svg";
import cadeado from "../assets/Icones/lock.svg";
import "../css/login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { exibirMensagemTemporaria } from "../utils/mensagens";


interface CadastroProps {
  titulo: string;
  descricao: string;
}

const Cadastro: React.FC<CadastroProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // ✅ Novo estado para mensagem de sucesso

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuário cadastrado:", userCredential.user);

      // ✅ Exibe mensagem de sucesso e limpa os campos
      exibirMensagemTemporaria(setSuccess, "Seu cadastro foi realizado com sucesso, retorne para a página de login para acessar.");
      setError(null);
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro desconhecido ao cadastrar");
      }
      setSuccess(null); // Remove mensagem de sucesso caso ocorra erro
    }
  };

  return (
    <div className="container">
      <div className="cabecalho">
        <h1>{props.titulo}</h1>
        <h2>{props.descricao}</h2>
      </div>

      <div className="form-container">
        <form onSubmit={handleSignUp}>
          {/* Input para E-mail */}
          <div className="input-container">
            <img src={iconeEmail} alt="ícone de email" />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input para Senha */}
          <div className="input-container">
            <img src={cadeado} alt="ícone de senha" />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <BotaoAcao funcao={handleSignUp} comando="Cadastrar" />
        </form>

        {/* ✅ Mensagem de sucesso */}
        {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}

        {/* Mensagem de erro */}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>

      <EntrarComGoogle texto="Cadastre com o google" />
      <TrocarPaginaLogin texto="Já tem uma conta?" textoLink="Faça login aqui" />
    </div>
  );
};

export default Cadastro;
