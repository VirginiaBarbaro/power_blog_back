import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import articleRoutes from "./articleRoutes";
import commentRoutes from "./commentRoutes";
import favouriteRoutes from "./favouriteRoutes";
import categoryRoutes from "./categoryRoutes";

const router: Router = Router();

router.use("/categories", categoryRoutes);
router.use("/auth", authRoutes);
router.use("/articles", articleRoutes);
router.use("/comments", commentRoutes);
router.use("/favourites", favouriteRoutes);
router.use("/users", userRoutes);

export default router;
