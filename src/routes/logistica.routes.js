import { Router } from "express";
import { defaultR, getImagen } from "../controllers/logistica.controller.js";
import { sessionChecker } from "../functions/authorization.js";

const router = Router();

router.get("/logistica/:id", sessionChecker, defaultR);

export default router;
