import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  destroyUser,
} from "../controllers/userController";
import multer from "../libs/multer";
const router: Router = Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", multer.single("avatar"), createUser);

router.patch("/:id", multer.single("avatar"), updateUser);

router.delete("/:id", destroyUser);

export default router;
