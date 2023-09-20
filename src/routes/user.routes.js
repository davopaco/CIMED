import { Router } from "express";
import { loginUser, registerUser, defaultR } from "../controllers/user.controller.js";

const router = Router();

router.get('/user', defaultR);
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;