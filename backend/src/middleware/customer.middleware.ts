import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";
import { PubTokenPayload } from "../controllers/auth.controller";

const PUB_ACCESS_TOKEN_SECRET =
  env.PUB_ACCESS_TOKEN_SECRET || "pub_access_token_secret";

export const customerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided!" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Invalid token! Please login to continue!" });
  }

  jwt.verify(token, PUB_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Invalid token! Please login to continue!" });
    }

    const payload = decoded as PubTokenPayload;
    req.customer = { id: payload.id };

    return next();
  });
};
