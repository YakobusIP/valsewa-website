import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  UnauthorizedError
} from "../lib/error";

const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET || "access_token_secret";
const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET || "refresh_token_secret";

type TokenPayload = {
  username: string;
};

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new BadRequestError("Invalid request body!");
      }

      if (await this.authService.login(username, password)) {
        const accessToken = jwt.sign({ username }, ACCESS_TOKEN_SECRET, {
          expiresIn: "15m"
        });

        const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET, {
          expiresIn: "7d"
        });

        const isProduction = env.NODE_ENV === "production";

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax"
        });

        res.status(200).json({ accessToken, username });
      } else {
        throw new UnauthorizedError("Invalid credentials!");
      }
    } catch (error) {
      if (
        error instanceof BadRequestError ||
        error instanceof UnauthorizedError ||
        error instanceof InternalServerError
      ) {
        return next(error);
      }

      return next(new InternalServerError((error as Error).message));
    }
  };

  logout = async (_: Request, res: Response) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });
    return res.status(200).json({ message: "Logged out successfully!" });
  };

  validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader) {
        throw new UnauthorizedError("Access denied. No token provided!");
      }

      const token = authHeader.split(" ")[1];

      if (!token) throw new UnauthorizedError("Invalid token!");

      jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid token!" });
        }

        const payload = decoded as TokenPayload;

        return res.json({ username: payload.username });
      });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) throw new ForbiddenError("Session timed out!");

      jwt.verify(
        refreshToken as string,
        REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) return next(new ForbiddenError("Invalid token!"));

          const payload = decoded as TokenPayload;

          const accessToken = jwt.sign(
            { username: payload.username },
            ACCESS_TOKEN_SECRET,
            {
              expiresIn: "15m"
            }
          );

          return res.status(200).json({ accessToken });
        }
      );
    } catch (error) {
      if (error instanceof ForbiddenError) {
        return next(error);
      }
      return next(new InternalServerError((error as Error).message));
    }
  };
}
