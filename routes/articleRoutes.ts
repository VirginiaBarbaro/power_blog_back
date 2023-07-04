import { Router } from "express";
import articleController from "../controllers/articleController";
import multer from "../libs/multer";
import { expressjwt } from "express-jwt";
const router: Router = Router();

router.get("/", articleController.getArticles);

router.get("/:id", articleController.getArticle);

router.post(
  "/",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  multer.single("image"),
  articleController.createArticle,
);

router.patch("/:id", multer.single("image"), articleController.updateArticle);

router.delete("/:id", articleController.destroyArticle);

export default router;

// Token User test
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY4ODQ4MzAwNH0.95hLsZuQPduYyO5jXXvkqQKTIaM5PiF5PgQIjuT_egE
