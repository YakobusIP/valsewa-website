import { NextFunction, Request, Response } from "express";
import { CustomError, InternalServerError } from "../lib/error";

export const errorMiddleware = async (
  err: CustomError,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  console.error(err);

  return res.status(err.statusCode || 500).json({
    error: err.message
  });
};
