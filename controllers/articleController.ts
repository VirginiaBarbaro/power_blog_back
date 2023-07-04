import { Request, Response } from "express";
import Article from "../models/Article";
// import { AuthRequest } from "../types/requestAuth";

interface AuthRequest extends Request {
  auth?: {
    id: number;
    isAdmin: boolean;
  };
}

export async function getArticles(_req: Request, res: Response) {
  try {
    const articles = await Article.findAll();
    return res.json(articles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
}

export async function getArticle(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);
    return res.json(article);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function createArticle(req: AuthRequest, res: Response) {
  try {
    const { title, content } = req.body;
    const userId = req.auth?.isAdmin ? null : req.auth?.id;
    const adminId = req.auth?.isAdmin ? req.auth?.id : null;
    const article = await Article.create({
      title,
      content,
      userId,
      adminId,
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

    const { title, content } = req.body;

    const updatedArticle = await Article.update(
      {
        title,
        content,
        image: req.file?.path,
      },
      {
        where: { id },
      },
    );
    res.json({ updatedArticle, message: "Article successfully updated!" });
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
