import { Router } from "express";

import {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser,
  googleAuth
} from "../controllers/auth.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/google", googleAuth);

router.post("/refresh-token", refreshToken);

router.get("/me",verifyJWT,getCurrentUser)

router.post("/logout", verifyJWT,  logout);

export default router;