import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "./Firebase";

export async function configurarSessao() {
  try {
    await setPersistence(auth, browserSessionPersistence);
    console.log("Sessão configurada para durar enquanto a aba do navegador estiver aberta.");
  } catch (error) {
    console.error("Erro ao configurar persistência da sessão:", error);
    throw error; // rethrow para tratar no login
  }
}
