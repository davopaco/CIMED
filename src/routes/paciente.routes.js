import { Router } from "express";
import {
  defaultR,
  getImagen,
  modificarDatosVista,
  modificarDatos,
  upload,
} from "../controllers/paciente.controller.js";
import { sessionChecker, logoutSession } from "../functions/authorization.js";

const router = Router();

router.get("/imagenPerfil", getImagen);
router.get("/paciente/modificar", modificarDatosVista);
router.post("/paciente/modificar", upload.single("pfp"), modificarDatos);
router.get("/logout", logoutSession);
router.get("/paciente/:id", sessionChecker, defaultR);

export default router;
