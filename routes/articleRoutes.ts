import { Router } from "express";
import {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  destroyArticle,
  getArticlesByUser,
} from "../controllers/articleController";
import multer from "../libs/multer";
import { expressjwt } from "express-jwt";
const router: Router = Router();

router.get("/", getArticles);

router.get("/:id", getArticle);

router.get("/user/:userId", getArticlesByUser);

router.post(
  "/",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  multer.single("image"),
  createArticle
);

router.patch(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  multer.single("image"),
  updateArticle
);

router.delete(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  destroyArticle
);

export default router;
