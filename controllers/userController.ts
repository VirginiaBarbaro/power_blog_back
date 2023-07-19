import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Users not found" });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "User id not found" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let { password, firstname, lastname, username, email, bio } = req.body;

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    const [userToUpdate] = await User.update(
      {
        password,
        firstname,
        lastname,
        email,
        username,
        bio,
        avatar: req.file?.path,
      },
      {
        where: { id },
      }
    );

    if (userToUpdate === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await User.findByPk(id);
    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.json(500).json({ error: "Internal server error, impossible to update" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    const existingEmail = await User.findOne({ where: { email: email } });

    if (existingEmail) {
      return res.json({ message: "Email already exist!" });
    } else {
      const newUser = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        avatar: req.file?.path,
        password: password,
      });
      res.json({ message: "User successfully created", newUser });
      await newUser.save();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating new user" });
  }
}

export async function destroyUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const userToDestroy = await User.destroy({
      where: { id },
    });
    res.json(userToDestroy);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error server, deleting user" });
  }
}
