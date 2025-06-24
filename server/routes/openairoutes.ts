import express from "express";
import { generateMindMapController } from "../controllers/openai";

const router = express.Router();

router.post("/generate", generateMindMapController);

export default router;