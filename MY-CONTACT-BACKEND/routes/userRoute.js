import { Router } from "express";
import { UserController } from "../controller/index.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post("/register", UserController.registration);

router.post("/login", UserController.login);

router.get("/current", verifyToken, UserController.currentUser);

export default router;