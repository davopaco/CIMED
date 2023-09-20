import { Router } from "express"
import { defaultR, getDatos } from "../controllers/paciente.controller.js"
const router = Router()

router.get('/paciente', defaultR)
router.get('/paciente/:id_paciente', getDatos)
export default router