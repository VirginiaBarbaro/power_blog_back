import User from "../models/User";
import { Request, Response } from "express";

async function index(_req: Request, res: Response) {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Users not found" });
  }
}

export default { index };
