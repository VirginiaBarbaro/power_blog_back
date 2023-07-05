import { Request, Response } from "express";
import Comment from "../models/Comment";
import User from "../models/User";
import Admin from "../models/Admin";

interface AuthenticateRequest extends Request {
  auth?: {
    id: number;
    isAdmin: boolean;
  };
}

export async function getComments(_req: Request, res: Response) {
  try {
    const comments = await Comment.findAll();

    await Promise.all(
      comments.map(async (comment) => {
        await comment.reload({
          include: [
            { model: User, attributes: { exclude: ["password"] } },
            { model: Admin, attributes: { exclude: ["password"] } },
          ],
        });
      })
    );
    return res.status(201).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getComment(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    await comment?.reload({
      include: [
        { model: User, attributes: { exclude: ["password"] } },
        { model: Admin, attributes: { exclude: ["password"] } },
      ],
    });

    return res.json(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function createComment(req: AuthenticateRequest, res: Response) {
  try {
    const articleId = req.params.id;
    const { content } = req.body;
    /* La variable userId se establecerá en null si el usuario autenticado es un administrador */
    const userId = req.auth?.isAdmin ? null : req.auth?.id;
    /* La variable adminId se establecerá en null si el usuario autenticado es un usuario comun */
    const adminId = req.auth?.isAdmin ? req.auth?.id : null;

    const comment = await Comment.create({
      content,
      userId,
      adminId,
      articleId: articleId,
    });
    await comment.save();
    return res.json({ comment, message: "Comment successfully created!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateComment(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedComment = await Comment.update(
      {
        content,
      },
      {
        where: { id },
      }
    );
    return res.status(200).json({ updatedComment, message: "Comment successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function destroyComment(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const commentDetroyed = await Comment.destroy({
      where: { id },
    });
    return res.status(200).json({ commentDetroyed, message: "Comment successfully deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
