import { Router } from "express";
import { defaultR, contactoDefault } from "../controllers/home.controller.js";

const router = Router();
router.get("/", defaultR);
router.get("/contacto", contactoDefault);

export default router;
