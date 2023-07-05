import { Router } from "express";
import { saveFavouriteArticle, deleteFavoiriteArticle } from "../controllers/favouriteController";
import { expressjwt } from "express-jwt";

const router: Router = Router();

router.post(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  saveFavouriteArticle,
);

router.delete("/:id", deleteFavoiriteArticle);

export default router;
