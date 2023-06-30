import User from "../models/User";
import { Request, Response } from "express";
import { CreateUserRequest } from "../types/user";

async function index(_req: Request, res: Response) {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Users not found" });
  }
}

async function store(req: Request, res: Response): Promise<void> {
  try {
    const userData: CreateUserRequest = req.body;

    const newUser = await User.create({
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      username: userData.username,
      avatar: userData.avatar,
      password: userData.password,
      isAdmin: userData.isAdmin,
    });
    res.json(newUser);
    await newUser.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating new user" });
  }
}

export default { index, store };
