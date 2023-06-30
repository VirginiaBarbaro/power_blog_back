import User from "../models/User";
import { Request, Response } from "express";
import { CreateUserRequest, UpdateUserRequest } from "../types/user";

async function getUsers(_req: Request, res: Response) {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Users not found" });
  }
}

async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "User id not found" });
  }
}

async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const userData: UpdateUserRequest = req.body;

    const userUpdated = await User.update(
      {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        username: userData.username,
        avatar: userData.avatar,
        password: userData.password,
      },
      { where: { id } },
    );
    console.log(req.body);

    res.json(userUpdated);
  } catch (error) {
    console.log(error);
    res.json(500).json({ error: "Internal server error, impossible to update" });
  }
}

async function createUser(req: Request, res: Response): Promise<void> {
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
