import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { CreateUserRequest, UpdateUserRequest } from "../types/user";

async function getUsers(_req: Request, res: Response) {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Users not found" });
  }
}

async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "User id not found" });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userData: UpdateUserRequest = req.body;

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const [userToUpdate] = await User.update(userData, {
      where: { id },
    });

    if (userToUpdate === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateUser = await User.findByPk(id);
    return res.json(updateUser);
  } catch (error) {
    console.log(error);
    res.json(500).json({ error: "Internal server error, impossible to update" });
  }
}

async function createUser(req: Request, res: Response) {
  try {
    const userData: CreateUserRequest = req.body;

    const existingEmail = await User.findOne({ where: { email: userData.email } });

    if (existingEmail) {
      return res.json({ message: "Email already exist!" });
    } else {
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
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating new user" });
  }
}

async function destroyUser(req: Request, res: Response) {
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
export default { getUsers, createUser, updateUser, getUser, destroyUser };
