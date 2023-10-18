import { Router } from "express";
import {
  loginUser,
  registerUser,
  defaultR,
  upload,
  redirectValid,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/user", defaultR);
router.post("/login", loginUser, redirectValid);
router.post("/register", upload.single("pfp"), registerUser);

export default router;
