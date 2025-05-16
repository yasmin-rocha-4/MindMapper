export function exibirMensagemTemporaria(
    setMensagem: React.Dispatch<React.SetStateAction<string | null>>,
    texto: string,
    tempo = 5000 // 5 segundos
  ) {
    setMensagem(texto);
    setTimeout(() => {
      setMensagem(null);
    }, tempo);
  }
  