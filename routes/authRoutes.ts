import { Router } from "express";
import { adminToken, userToken } from "../controllers/authController";

const router: Router = Router();

router.post("/users", userToken);
router.post("/admins", adminToken);

export default router;
