import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("Hola esta es la ruta de autenticacion");
});

export default router;
