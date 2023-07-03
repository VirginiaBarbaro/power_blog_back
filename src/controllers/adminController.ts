import Admin from "../models/Admin";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { CreateUserRequest } from "../types/user";
import { UpdateUserRequest } from "../types/user";

async function getAdmins(_req: Request, res: Response) {
  try {
    const admins = await Admin.findAll({ attributes: { exclude: ["password"] } });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
}

async function getAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id, { attributes: { exclude: ["password"] } });
    res.json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createAdmin(req: Request, res: Response) {
  try {
    const adminData: CreateUserRequest = req.body;

    const existingEmail = await Admin.findOne({ where: { email: adminData.email } });

    if (existingEmail) {
      return res.json({ message: "Email already exists!" });
    } else {
      const newAdmin = await Admin.create({
        firstname: adminData.firstname,
        lastname: adminData.lastname,
        email: adminData.email,
        username: adminData.username,
        avatar: adminData.avatar,
        password: adminData.password,
      });

      res.json(newAdmin);
      await newAdmin.save();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const adminData: UpdateUserRequest = req.body;

    if (adminData.password) {
      adminData.password = await bcrypt.hash(adminData.password, 10);
    }

    //Pongo los [] porque es [affettedCount: numebr]
    const [adminToUpdate] = await Admin.update(adminData, {
      where: { id },
    });

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

async function destroyAdmin(req: Request, res: Response) {
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

export default { getAdmins, getAdmin, createAdmin, updateAdmin, destroyAdmin };
