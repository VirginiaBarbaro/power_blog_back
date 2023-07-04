import Admin from "../models/Admin";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export async function getAdmins(_req: Request, res: Response) {
  try {
    const admins = await Admin.findAll({ attributes: { exclude: ["password"] } });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
}

export async function getAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id, { attributes: { exclude: ["password"] } });
    res.json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createAdmin(req: Request, res: Response) {
  try {
    const { firstname, lastname, email, username, password } = req.body;

    const existingEmail = await Admin.findOne({ where: { email: email } });

    if (existingEmail) {
      return res.json({ message: "Email already exists!" });
    } else {
      const newAdmin = await Admin.create({
        firstname,
        lastname,
        email,
        username,
        avatar: req.file?.path,
        password,
      });

      res.json(newAdmin);
      await newAdmin.save();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let { firstname, lastname, email, password, username } = req.body;

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    //Pongo los [] porque es [affettedCount: numebr]
    const [adminToUpdate] = await Admin.update(
      {
        password,
        firstname,
        lastname,
        email,
        username,
        avatar: req.file?.path,
      },
      {
        where: { id },
      },
    );

    if (adminToUpdate === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const updatedAdmin = await Admin.findByPk(id);
    return res.json(updatedAdmin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function destroyAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const adminToDestroy = await Admin.destroy({
      where: { id },
    });
    res.json(adminToDestroy);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

