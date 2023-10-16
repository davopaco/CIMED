import { Router } from "express";
import { defaultR } from "../controllers/medico.controller.js";
import { sessionChecker } from "../functions/authorization.js";

const router = Router();

router.get("/medico/:id", sessionChecker, defaultR);

export default router;
