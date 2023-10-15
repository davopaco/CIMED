import { Router } from "express";
import { defaultR, getImagen } from "../controllers/paciente.controller.js";
const router = Router();
import { sessionChecker } from "../functions/authorization.js";

router.get("/paciente/:id", sessionChecker, defaultR);
router.get("/imagenPerfil/:id", sessionChecker, getImagen);

export default router;
