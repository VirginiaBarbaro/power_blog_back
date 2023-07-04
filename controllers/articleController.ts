import { Request, Response } from "express";
import Article from "../models/Article";

async function getArticles(_req: Request, res: Response) {
  try {
    const articles = await Article.findAll();
    return res.json(articles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
}

async function getArticle(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);
    return res.json(article);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function createArticle(req: Request, res: Response) {
  try {
    const { title, content } = req.body;

    const article = await Article.create({
      title,
      content,
      image: req.file?.path,
    });
    res.json({ article, message: "Article successflly created" });
    await article.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateArticle(req: Request, res: Response) {
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

async function destroyArticle(req: Request, res: Response) {
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

export default { getArticles, getArticle, createArticle, updateArticle, destroyArticle };
