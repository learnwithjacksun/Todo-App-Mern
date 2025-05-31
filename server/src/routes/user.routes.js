import { Router } from "express"; 
import { login, logout, register, checkAuth } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", authenticate, logout)
router.get("/check", authenticate, checkAuth)

export default router