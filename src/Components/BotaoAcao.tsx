import React from "react";
import styled from "styled-components";
interface BotaoAcaoProps{
    comando: string;
    className?: string;
    funcao?: (e: React.FormEvent<Element>) => void | Promise<void>;
}

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  height: 60px;
  width: 200px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056d2;
  }
`;

const BotaoAcao: React.FC<BotaoAcaoProps> = props =>{
    return <StyledButton onClick={props.funcao}>{props.comando}</StyledButton>;
}

    
   
export default BotaoAcao;