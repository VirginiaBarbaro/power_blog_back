import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { expressjwt } from "express-jwt";
import requireAdmin from "../middlewares/requireAdmin";

const router: Router = Router();

router.get("/", getCategories);

router.get("/:name", getCategory);


router.post(
  "/",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  requireAdmin,
  createCategory
);

console.log(process.env.JWT_KEY, "category");

router.patch(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  requireAdmin,
  updateCategory
);


router.delete(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  requireAdmin,
  deleteCategory
);

export default router;
