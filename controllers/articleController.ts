import { Request, Response } from "express";
import Article from "../models/Article";
import User from "../models/User";
interface AuthRequest extends Request {
  auth?: {
    id: number;
    isAdmin: boolean;
  };
}

export async function getArticlesByUser(req: AuthRequest, res: Response) {
  try {
    const userId = req.params.userId;
    const articles = await Article.findAll({ where: { userId } });
    return res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
}

export async function getArticles(_req: Request, res: Response) {
  try {
    const articles = await Article.findAll({
      include: [{ model: User, attributes: { exclude: ["password", "createdAt", "updatedAt"] } }],
    });
    return res.json(articles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
}

export async function getArticle(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id, {
      include: [{ model: User, attributes: { exclude: ["password", "createdAt", "updatedAt"] } }],
    });

    return res.json(article);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function createArticle(req: AuthRequest, res: Response) {
  try {
    const { title, content, headline, categoryId } = req.body;
    const userId = req.auth?.id;

    const article = await Article.create({
      title,
      content,
      headline,
      categoryId,
      userId,
      image: req.file?.path,
    });
    await article.save();
    return res.json({ article, message: "Article successflly created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateArticle(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { title, content, headline } = req.body;

    const updatedArticle = await Article.update(
      {
        title,
        content,
        headline,
        image: req.file?.path,
      },
      {
        where: { id },
      }
    );
    console.log(req.body);
    return res.json({ updatedArticle, message: "Article successfully updated!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function destroyArticle(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const articleToDestroy = await Article.destroy({
      where: { id },
    });
    return res.json({ articleToDestroy, message: "Article successfully deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
