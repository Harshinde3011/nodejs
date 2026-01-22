import { Router } from "express";
import { ContactController } from "../controller/index.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();

router.get("/", ContactController.getContacts)

router.post("/add", verifyToken, ContactController.addContacts)

router.put("/:id", ContactController.updateContacts)

export default router;