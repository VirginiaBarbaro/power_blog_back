import { Router } from "express";
import userController from "../controllers/userController";
import multer from "../libs/multer";
const router: Router = Router();

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.post("/", multer.single("avatar"), userController.createUser);

router.patch("/:id", multer.single("avatar"), userController.updateUser);

router.delete("/:id", userController.destroyUser);

export default router;
