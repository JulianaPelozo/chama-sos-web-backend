import { Router } from "express";
import { OcorrenciaController } from "../controllers/OcorrenciaController";

const router = Router();

router.get("/", OcorrenciaController.listar);
router.get("/:id", OcorrenciaController.buscar);
router.post("/", OcorrenciaController.criar);
router.put("/:id", OcorrenciaController.atualizar);
router.delete("/:id", OcorrenciaController.remover);

export default router;
