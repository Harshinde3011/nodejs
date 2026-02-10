import { Router } from "express"
import superAdminController from "./superAdminController.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { requireRole } from "../../middlewares/rbac.js";

const _router = Router();

_router.post("/register", superAdminController.register);

_router.post("/login", superAdminController.login);

_router.post("/create-user", verifyToken, requireRole(["superAdmin"]), superAdminController.createUser);

export default _router;

