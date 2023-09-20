import {Router } from "express"
import {defaultR} from "../controllers/home.controller.js"

const router = Router()
router.get('/', defaultR);

export default router