import { Router } from "express";
import { loginUser, registerUser, defaultR, upload} from "../controllers/user.controller.js";

const router = Router();

router.get('/user', defaultR);
router.post('/login', loginUser);
router.post('/register', upload.single('pfp'), registerUser);

export default router;