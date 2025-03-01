import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";

const SCHEDULER_API_KEY = env.SCHEDULER_API_KEY;

export const schedulerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["api-key"];

  if (!apiKey) {
    return res
      .status(401)
      .json({ error: "Access denied. No API Key provided!" });
  }

  if (apiKey !== SCHEDULER_API_KEY) {
    return res.status(401).json({ error: "Access denied!" });
  }

  return next();
};
