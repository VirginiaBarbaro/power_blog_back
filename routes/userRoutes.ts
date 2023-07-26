import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateInfoUser,
  destroyUser,
  updateUserCredentials,
} from "../controllers/userController";
// import { expressjwt } from "express-jwt";
import multer from "../libs/multer";
import { expressjwt } from "express-jwt";
const router: Router = Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", multer.single("avatar"), createUser);

router.patch(
  "/:id",
  expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  multer.single("avatar"),
  updateInfoUser
);

router.patch(
  "/credentials/:id",
  // expressjwt({ secret: `${process.env.JWT_KEY}`, algorithms: ["HS256"] }),
  updateUserCredentials
);

router.delete("/:id", destroyUser);

export default router;
