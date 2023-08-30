import * as dotenv from "dotenv";
dotenv.config();
import {} from "../types/environment";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export async function userToken(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) {
      const checkJwt = await user.isValidPassword(password);

      if (checkJwt) {
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, `${process.env.JWT_KEY}`);
        res.json({
          token,
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          avatar: user.avatar,
          bio: user.bio,
        });
      }
    } else {
      res.status(406).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
