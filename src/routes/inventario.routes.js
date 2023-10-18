import {Router } from "express"
import { defaultR, postProducto, getProducto,getProductoBuscar} from "../controllers/inventario.controller.js"

const router = Router()
router.get('/inventario', defaultR);
router.post('/inventario/ingreso/:id', postProducto)
router.get('/inventario/ver', getProducto)
router.post('/buscar' ,getProductoBuscar)
export default router