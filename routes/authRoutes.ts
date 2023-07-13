import { Router } from "express";
import { userToken } from "../controllers/authController";

const router: Router = Router();

router.post("/users", userToken);

export default router;
