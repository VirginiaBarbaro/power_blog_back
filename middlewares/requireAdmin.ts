import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  auth?: {
    isAdmin: boolean;
  };
}

function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.auth && req.auth.isAdmin) {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied!" });
  }
}

export default requireAdmin;
