import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import articleRoutes from "./articleRoutes";
import commentRoutes from "./commentRoutes";
import favouriteRoutes from "./favouriteRoutes";

const router: Router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/articles", articleRoutes);
router.use("/comments", commentRoutes);
router.use("/favourites", favouriteRoutes);

export default router;
