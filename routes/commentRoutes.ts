import { Router } from "express";
import {
  getComments,
  createComment,
  getComment,
  updateComment,
  destroyComment,
} from "../controllers/commentController";
import { expressjwt } from "express-jwt";

const router: Router = Router();

router.get("/", getComments);

router.get("/:id", getComment);

router.post(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  createComment,
);

router.patch("/:id", updateComment);

router.delete("/:id", destroyComment);

export default router;
