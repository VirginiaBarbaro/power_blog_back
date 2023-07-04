import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import articleRoutes from "./articleRoutes";
import commentRoutes from "./commentRoutes";

const router: Router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/admins", adminRoutes);
router.use("/articles", articleRoutes);
router.use("/comments", commentRoutes);

export default router;
