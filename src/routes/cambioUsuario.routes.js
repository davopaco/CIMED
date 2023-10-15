import { Router } from "express";
import { cambioUsuarioPage } from "../functions/redirects.js";

const router = Router();
router.post("/cambioUsuario", cambioUsuarioPage);

export default router;
