import { Router } from "express";
import { defaultR, getImagen } from "../controllers/paciente.controller.js";
import { sessionChecker, logoutSession } from "../functions/authorization.js";

const router = Router();

router.get("/paciente/:id", sessionChecker, defaultR);
router.get("/imagenPerfil", getImagen);
router.get("/logout", logoutSession);

export default router;
