import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { handleUpload } from "../libs/multer";

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

export async function updateInfoUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let { firstname, lastname, username, bio } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file upload!" });
    }
    const uploadImage = await handleUpload(req.file);
    const userToUpdate = await User.update(
      {
        firstname,
        lastname,
        username,
        bio,
        avatar: uploadImage.url,
      },
      {
        where: { id },
      }
    );
    return res.json(userToUpdate);
  } catch (error) {
    console.log(error);
    res.json(500).json({ error: "Internal server error, impossible to update" });
  }
}

export async function updateUserCredentials(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let { password, email } = req.body;

    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    const updatedCredentials = await User.update(
      {
        email,
        password,
      },
      { where: { id } }
    );

    return res.status(200).json({ updatedCredentials, message: "Updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Impossible to update information!" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { firstname, lastname, username, email, password, bio, isAdmin } = req.body;
    const existingEmail = await User.findOne({ where: { email: email } });

    if (existingEmail) {
      return res.json({ message: "Email already exist!" });
    } else {
      if (!req.file) {
        return res.status(400).json({ message: "No file upload!" });
      }
      const uploadImage = await handleUpload(req.file);
      const newUser = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        bio: bio,
        username: username,
        avatar: uploadImage.url,
        isAdmin: isAdmin,
        password: password,
      });
      res.status(200).json({ message: "User successfully created", newUser });
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
    res.status(200).json({ userToDestroy, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error server, deleting user" });
  }
}
