import { Request, Response } from "express";
import { generateMindMap } from "../services/openaiService";

export const generateMindMapController = async (req: Request, res: Response) => {
  const { text } = req.body;

  try {
    const result = await generateMindMap(text);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar mapa mental" });
  }
};
