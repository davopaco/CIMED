import {Router } from "express"
import { defaultR, postHistorial, getHistorial} from "../controllers/historial.controller.js"

const router = Router()
router.get('/historial', defaultR);
router.post('/historial/ingreso/:id_cita', postHistorial)
router.get('/historial/ver/:id_paciente', getHistorial)

export default router