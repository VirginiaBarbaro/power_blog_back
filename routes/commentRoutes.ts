import { Router } from "express";
import {
  getComments,
  createComment,
  getComment,
  updateComment,
  destroyComment,
  getCommentsByArticle,
} from "../controllers/commentController";
import { expressjwt } from "express-jwt";

const router: Router = Router();

router.get("/", getComments);

router.get("/:id", getComment);

router.get("/article/:articleId", getCommentsByArticle);

router.post(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  createComment
);

router.patch(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  updateComment
);

router.delete(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  destroyComment
);

export default router;
