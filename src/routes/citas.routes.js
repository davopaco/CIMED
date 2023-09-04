import {Router } from "express"
import { defaultR, postCitas } from "../controllers/citas.controller.js"

const router = Router()
router.get('/', defaultR);
router.post('/citas', postCitas)

export default router