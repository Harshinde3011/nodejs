import { Router } from "express";
import { UserController } from "../controller/index.js";

const router = Router();

router.post("/register", UserController.registration)

router.post("/login", UserController.login)

// router.get("/current", )

export default router;