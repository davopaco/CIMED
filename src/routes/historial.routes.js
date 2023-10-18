import { Router } from "express";
import {
  defaultR,
  agregarHistorial,
  getHistorial,
  getModificarHistorial,
} from "../controllers/historial.controller.js";
import { sessionChecker } from "../functions/authorization.js";

const router = Router();
router.get("/historial/agregar", sessionChecker, defaultR);
router.get("/historial/modificar", getModificarHistorial);
router.post("/historial/agregar", sessionChecker, agregarHistorial);
router.get("/historial/ver/:id_paciente", sessionChecker, getHistorial);

export default router;
