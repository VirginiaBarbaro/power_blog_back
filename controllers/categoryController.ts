import Article from "../models/Article";
import Category from "../models/Category";
import { Request, Response } from "express";

export async function getCategories(_req: Request, res: Response) {
  try {
    const categories = await Category.findAll({ include: [{ model: Article }] });
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Impossible to find categories" });
  }
}

export async function getCategory(req: Request, res: Response) {
  try {
    const { name } = req.params;
    const category = await Category.findOne({
      where: { name },
      include: [{ model: Article }],
    });
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Impossible to find this category" });
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({
      name,
    });
    await newCategory.save();
    return res.status(200).json({ message: "New category has been created!", newCategory });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Impossible to create a category" });
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updatedCategory = await Category.update(
      {
        name,
      },
      {
        where: { id },
      }
    );
    return res.status(200).json({ message: "Category edited!", updatedCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Impossible to update a categroy" });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const categoryToDelete = await Category.destroy({
      where: { id },
    });
    return res.status(200).json({ message: "Category successfully deleted!", categoryToDelete });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error on deleting category" });
  }
}
