import express from "express";
import { register, login, profile, me } from "../controllers/user.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, me);
router.get("/profile", authenticate, profile);

export default router;
