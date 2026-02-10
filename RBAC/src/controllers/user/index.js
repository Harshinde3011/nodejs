import { Router } from "express"
import userController from "./userController.js";

const _router = Router();

_router.post("/register", userController.register);

_router.post("/login", userController.login);

export default _router;