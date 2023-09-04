import {Router } from "express"
import { defaultR, postCitas, getCitas } from "../controllers/citas.controller.js"

const router = Router()
router.get('/', defaultR);
router.post('/citas/:id_paciente', postCitas)
router.get('/citas/:id_doctor', getCitas)

export default router