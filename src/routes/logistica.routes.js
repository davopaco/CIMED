import { Router } from "express";
import { defaultR } from "../controllers/logistica.controller.js";
import { sessionChecker } from "../functions/authorization.js";

const router = Router();

router.get("/logistica/:id", sessionChecker, defaultR);

export default router;
