import { Router } from "express";
import adminController from "./adminController.js";
import { requireRole } from "../../middlewares/rbac.js"
import { verifyToken } from "../../middlewares/verifyToken.js";

const _router = Router()

_router.post("/register", adminController.register);

_router.post("/login", adminController.login);

_router.post("/create-user", verifyToken, requireRole(["admin"]) ,adminController.createUser);


export default _router

