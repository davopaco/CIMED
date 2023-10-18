import { Router } from "express";
import {
  defaultR,
  modificarDatosVista,
  modificarDatos,
} from "../controllers/medico.controller.js";
import { sessionChecker } from "../functions/authorization.js";
import { upload } from "../controllers/paciente.controller.js";

const router = Router();

router.get("/medico/modificar", modificarDatosVista);
router.post("/medico/modificar", upload.single("pfp"), modificarDatos);
router.get("/medico/:id", sessionChecker, defaultR);

export default router;
