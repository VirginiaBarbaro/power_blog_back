import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("hola te conectasete a la ruta ");
});

export default router;
