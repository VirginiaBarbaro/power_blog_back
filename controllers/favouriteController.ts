import Article from "../models/Article";
import Favourite from "../models/Favourite";
import { Request, Response } from "express";

interface AuthRequest extends Request {
  auth?: {
    id: number;
    isAdmin: boolean;
  };
}

export async function saveFavouriteArticle(req: AuthRequest, res: Response) {
  try {
    const userId = req.auth?.isAdmin ? null : req.auth?.id;
    const adminId = req.auth?.isAdmin ? req.auth?.id : null;

    const articleId = req.params.id;

    const favouriteArticle = await Favourite.create({
      userId,
      adminId,
      articleId: +articleId,
    });
    await favouriteArticle.save();

    return res.json({ favouriteArticle, Article, message: "Article succesffully saved!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteFavoiriteArticle(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const articleDestroyed = await Favourite.destroy({
      where: { id },
    });
    return res.json(articleDestroyed);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
