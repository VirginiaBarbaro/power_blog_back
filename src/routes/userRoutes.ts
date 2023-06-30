import { Router } from "express";
import userController from "../controllers/userController";
const router: Router = Router();

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.post("/", userController.createUser);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.destroyUser);

export default router;
