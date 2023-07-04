import { Router } from "express";
import {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  destroyAdmin,
} from "../controllers/adminController";
// import adminController from "../controllers/adminController";

const router: Router = Router();

router.get("/", getAdmins);

router.get("/:id", getAdmin);

router.post("/", createAdmin);

router.patch("/:id", updateAdmin);

router.delete("/:id", destroyAdmin);

export default router;
