import { Router } from "express";
import adminController from "../controllers/adminController";

const router: Router = Router();

router.get("/", adminController.getAdmins);

router.get("/:id", adminController.getAdmin);

router.post("/", adminController.createAdmin);

router.patch("/:id", adminController.updateAdmin);

router.delete("/:id", adminController.destroyAdmin);

export default router;
