import { Router } from "express";
import { cambioUsuarioPage } from "../controllers/cambioUsuario.controller.js";

const router = Router();
router.get("/cambioUsuario", cambioUsuarioPage);

export default router;
