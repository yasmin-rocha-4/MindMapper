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
        background: "#0ACF83", 
        border: "none",
        height: "60px",
        width: "200px",
        borderRadius: "10px"
      }
};
   
export default BotaoAcao;