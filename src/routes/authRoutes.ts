import { Router } from "express";
import authController from "../controllers/authController";

const router: Router = Router();

router.post("/users", authController.userToken);
router.post("/admins", authController.adminToken);

export default router;
