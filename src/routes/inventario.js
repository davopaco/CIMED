import {Router } from "express"
import { defaultR, postProducto, getProducto} from "../controllers/inventario.controller.js"

const router = Router()
router.get('/inventario', defaultR);
router.post('/inventario/ingreso/:id', postProducto)
router.get('/inventario/ver/:id', getProducto)

export default router