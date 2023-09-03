import { Router } from "express";
import { loginUser, defaultR } from "../controllers/user.controller.js";

const router = Router();

router.get('/', defaultR);
router.post('/login', loginUser);
//router.post('/register', createUser);

export default router;