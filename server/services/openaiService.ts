import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function sanitizeMermaid(rawMermaid: string): string {
  let cleaned = rawMermaid.replace(/```mermaid([\s\S]*?)```/g, "$1");
  const match = cleaned.match(/graph TD[\s\S]*/);
  if (!match) return "";

  cleaned = match[0];
  const idsMap: Record<string, number> = {};

  cleaned = cleaned.replace(
    /^(\s*)([A-Za-z0-9 _\-().]+?)\[(.+?)\]/gm,
    (_match, indent, idText, label) => {
      let baseId = idText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
      if (!baseId) baseId = "node";

      idsMap[baseId] = (idsMap[baseId] || 0) + 1;
      const safeId = idsMap[baseId] > 1 ? `${baseId}_${idsMap[baseId]}` : baseId;

      const safeLabel = label.replace(/"/g, '\\"');
      return `${indent}${safeId}["${safeLabel}"]`;
    }
  );

  return cleaned.trim();
}

export async function generateMindMap(text: string): Promise<string> {
  const prompt = `
Você é um assistente especialista em visualização de informações.

Gere um DIAGRAMA usando o formato MERMAID (versão 'graph TD') com base no conteúdo a seguir.

Importante:
- Use IDs únicos e simples, formados apenas por letras minúsculas e números, sem espaços.
- Substitua espaços por underscore (_) nos IDs.
- Use texto descritivo completo dentro dos colchetes.
- Use conexões claras com '-->' para ligar os nós.
- Não crie loops nem conexões que possam se cruzar.
- Retorne apenas o código Mermaid, sem explicações ou texto extra.

Modelo:
graph TD
  node1[Tema Principal] --> node2[Tópico 1]
  node2 --> node3[Subtópico 1.1]
  node1 --> node4[Tópico 2]

Baseie-se no conteúdo:
"""
${text}
"""
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const raw = response.choices[0]?.message?.content || "";

// Corrige aspas internas nos colchetes do Mermaid
const cleanedRaw = raw.replace(/\["(.+?)"\]/g, "[$1]");

const sanitized = sanitizeMermaid(cleanedRaw);

if (!sanitized) {
  throw new Error("Erro ao gerar diagrama Mermaid válido.");
}

return sanitized;

}
