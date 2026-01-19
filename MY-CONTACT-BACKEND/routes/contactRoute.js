import { Router } from "express";
import ContactController from "../controller/contactController.js";
const router = Router();

router.get("/", ContactController.getContacts)

router.post("/add", ContactController.addContacts)

router.put("/:id", ContactController.updateContacts)

export default router;