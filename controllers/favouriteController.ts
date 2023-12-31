import Article from "../models/Article";
import Favourite from "../models/Favourite";
import { Request, Response } from "express";
import User from "../models/User";

interface AuthRequest extends Request {
  auth?: {
    id: number;
    isAdmin: boolean;
  };
}

export async function getOneFavourite(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const favouriteArticle = await Favourite.findOne({ where: { id } });

    await favouriteArticle?.reload({
      include: [{ model: Article }, { model: User, attributes: { exclude: ["password"] } }],
    });

    return res.json(favouriteArticle);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getFavouritesForAdmin(_req: Request, res: Response) {
  try {
    const favourites = await Favourite.findAll();
    return res.json(favourites);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getFavouritesForUser(req: AuthRequest, res: Response) {
  try {
    const userId = req.auth?.id;

    const favouritesArticles = await Favourite.findAll({ where: { userId } });

    await Promise.all(
      favouritesArticles.map(async (favouriteArticle) => {
        await favouriteArticle.reload({
          include: [{ model: Article }],
        });
      })
    );

    // { model: User, attributes: { exclude: ["password"] } }

    return res.json(favouritesArticles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function saveFavouriteArticle(req: AuthRequest, res: Response) {
  try {
    const userId = req.auth?.id;
    const articleId = req.params.id;

    const exisistingFavourite = await Favourite.findOne({
      where: { articleId, userId },
    });

    if (exisistingFavourite) {
      await exisistingFavourite.destroy();
      return res
        .status(200)
        .json({ message: "The article has already been cancelled as a favorite" });
    } else {
      const favouriteArticle = await Favourite.create({
        userId,
        articleId: +articleId,
      });
      await favouriteArticle.reload({
        include: [{ model: Article }, { model: User, attributes: { exclude: ["password"] } }],
      });
      return res.json({ favouriteArticle, message: "Article succesffully saved!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
