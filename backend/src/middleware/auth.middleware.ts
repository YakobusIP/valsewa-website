import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";
import { TokenPayload } from "../controllers/auth.controller";
import {
  patchRequestContext,
  refreshRequestLogger
} from "../lib/request-context";

const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET || "access_token_secret";

export const authMiddleware = (
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

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Invalid token! Please login to continue!" });
    }

    const payload = decoded as TokenPayload;
    req.adminUsername = payload.username;
    patchRequestContext({ adminUsername: payload.username });
    refreshRequestLogger(req);

    return next();
  });
};
