import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";
import openaiRoutes from "./routes/openairoutes";
import { generateMindMap } from "./services/openaiService";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/openai", openaiRoutes);

const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Nenhum arquivo enviado." });
    return;
  }

  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);

    const mindMap = await generateMindMap(data.text);

    fs.unlinkSync(req.file.path);

    res.status(200).json({ result: mindMap });
  } catch (err) {
    console.error("Erro ao processar o PDF:", err);
    res.status(500).json({ error: "Erro ao processar o PDF." });
  }
});

app.listen(PORT, () => {
  console.log(`[SERVER] Rodando na porta ${PORT}`);
});
