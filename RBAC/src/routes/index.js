import { Router } from "express";
import { logger } from "../middlewares/logger.js";
import userRoute from "../controllers/user/index.js";
import adminRoute from "../controllers/admin/index.js";
import superAdminRoute from "../controllers/superAdmin/index.js"

const router = Router();

router.use(logger);

router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use("/super-admin", superAdminRoute)


export default router;


// how to check it, 1st register user and get accessToken after login 
// try to create user from superAdmin, and paste users accessToken in authorization, which means normal user dont have access to create new user