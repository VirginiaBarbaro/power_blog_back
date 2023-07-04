import { Router } from "express";
import articleController from "../controllers/articleController";
import multer from "../libs/multer";

const router: Router = Router();

router.get("/", articleController.getArticles);

router.get("/:id", articleController.getArticle);

router.post("/", multer.single("image"), articleController.createArticle);

router.patch("/:id", multer.single("image"), articleController.updateArticle);

router.delete("/:id", articleController.destroyArticle);

export default router;
