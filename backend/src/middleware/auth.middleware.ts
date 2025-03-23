import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";

const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET || "access_token_secret";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Invalid token! Please login to continue!" });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: jwt.VerifyErrors | null) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Invalid token! Please login to continue!" });
    }

    return next();
  });
};
