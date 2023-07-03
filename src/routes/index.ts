import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";

const router: Router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/admins", adminRoutes);

export default router;
