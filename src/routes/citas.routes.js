import { Router } from "express";
import {
  defaultR,
  postCitas,
  getCitas,
} from "../controllers/citas.controller.js";

const router = Router();
router.get("/citas", defaultR);
router.get("/citas/doctor/:id_medico", getCitas);
router.post("/citas/:id_paciente", postCitas);

export default router;
