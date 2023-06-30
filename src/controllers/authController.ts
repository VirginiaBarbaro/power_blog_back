import Admin from "../models/Admin";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

async function userToken(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      const checkJwt = await user.isValidPassword(password);

      if (checkJwt) {
        const token = jwt.sign({ id: user.id, isAdmin: false }, "secretString");

        res.json({
          token,
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          isAdmin: false,
        });
      }
    } else {
      res.status(406).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function adminToken(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });

    if (admin) {
      const checkJwt = await admin.isValidPassword(password);

      if (checkJwt) {
        const token = jwt.sign({ id: admin.id, isAdmin: true }, "secretString");

        res.json({
          token,
          firstname: admin.firstname,
          lastname: admin.lastname,
          email: admin.email,
          isAdmin: true,
        });
      } else {
        res.status(406).json({ error: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default { userToken, adminToken };