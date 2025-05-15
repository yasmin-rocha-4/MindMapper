import React from "react";
interface BotaoAcaoProps{
    comando: string;
    className?: string;
    funcao?: (e: React.FormEvent<Element>) => void | Promise<void>;
}
const BotaoAcao: React.FC<BotaoAcaoProps> = props =>{
    return(<button onClick = {props.funcao} className="btn btn-primary col-12 mx-auto" style={styles.btnCustom}>{props.comando}</button>);
}
const styles = {
    btnCustom: {
        marginTop: "40px",
        background: "#007bff", 
        color: "white",
        border: "none",
        height: "60px",
        width: "200px",
        borderRadius: "10px",
        fontSize: "1rem",
        fontWeight: "bold"
      }
};
   
export default BotaoAcao;