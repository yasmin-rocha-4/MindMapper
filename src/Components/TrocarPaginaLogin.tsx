import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/trocarPaginaLogin.css"
interface TrocarPaginaLoginProps {
  texto: string;
  textoLink: string;
}

const TrocarPaginaLogin: React.FC<TrocarPaginaLoginProps> = ({ texto, textoLink }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Para obter a localização atual

  // Função para decidir para onde o usuário deve ser redirecionado
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página

    // Verifica se o usuário está na página de cadastro
    if (location.pathname === "/cadastro") {
      navigate("/login"); // Redireciona para a página de login
    } else {
      navigate("/cadastro"); // Redireciona para a página de cadastro (caso contrário)
    }
  };

  return (
    <div className="trocar-pagina">
      <p>{texto}</p>
      <a href="#" onClick={handleLinkClick}>
        {textoLink}
      </a>
    </div>
  );
};

export default TrocarPaginaLogin;
