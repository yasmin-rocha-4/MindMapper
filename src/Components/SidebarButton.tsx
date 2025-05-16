import React from "react";
import styled from "styled-components";

interface SidebarButtonProps {
  comando: string;
  className?: string;
  funcao?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

const StyledSidebarButton = styled.button`
  background-color: transparent;
  color: #007bff;
  border: none;
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0e7ff;
  }
`;

const SidebarButton: React.FC<SidebarButtonProps> = ({ comando, funcao }) => {
  return <StyledSidebarButton onClick={funcao}>{comando}</StyledSidebarButton>;
};

export default SidebarButton;
