import { Router } from "express";
import {
  saveFavouriteArticle,
  deleteFavoriteArticle,
  getFavouritesForUser,
  getFavouritesForAdmin,
  getOneFavourite,
} from "../controllers/favouriteController";
import { expressjwt } from "express-jwt";
import requireAdmin from "../middlewares/requireAdmin";

const router: Router = Router();

router.get(
  "/all",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  requireAdmin,
  getFavouritesForAdmin
);

router.get("/:id", getOneFavourite);

router.get(
  "/",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  getFavouritesForUser
);

router.post(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  saveFavouriteArticle
);

router.delete(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  deleteFavoriteArticle
);

export default router;
