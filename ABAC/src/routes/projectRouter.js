import { Router } from "express";
import { updateProject, viewProject } from "../controllers/projectController.js";
import { verifyToken } from "../middleware/authentication.js";
const _router = Router();

// Route to view a project 
_router.get("/:id", verifyToken, viewProject)

// Route to update a project
_router.put("/:id", verifyToken, updateProject)

export default _router;