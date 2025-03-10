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

/**
 * @openapi
 * components:
 *   schemas:
 *     TokenPayload:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         username:
 *           type: string
 *
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *
 *     RefreshResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @openapi
   * /api/auth/login:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Login a user.
   *     description: Authenticates a user using username and password and returns access and refresh tokens.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Successful login.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthResponse'
   *       400:
   *         description: Invalid request body.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       401:
   *         description: Invalid credentials.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
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

  /**
   * @openapi
   * /api/auth/logout:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Logout a user.
   *     description: Clears the refresh token cookie to log out the user.
   *     responses:
   *       200:
   *         description: Logged out successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LogoutResponse'
   */
  logout = async (_: Request, res: Response) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });
    return res.status(200).json({ message: "Logged out successfully!" });
  };

  /**
   * @openapi
   * /api/auth/validate-token:
   *   get:
   *     tags:
   *       - Authentication
   *     summary: Validate an access token.
   *     description: Validates the provided access token from the Authorization header.
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         required: true
   *         schema:
   *           type: string
   *         description: Bearer token in the format "Bearer {token}".
   *     responses:
   *       200:
   *         description: Token is valid.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 username:
   *                   type: string
   *       401:
   *         description: Invalid token.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
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
      if (error instanceof UnauthorizedError) {
        return next(error);
      }
      return next(new InternalServerError((error as Error).message));
    }
  };

  /**
   * @openapi
   * /api/auth/refresh-token:
   *   get:
   *     tags:
   *       - Authentication
   *     summary: Refresh the access token.
   *     description: Uses the refresh token from cookies to generate a new access token.
   *     responses:
   *       200:
   *         description: New access token generated.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RefreshResponse'
   *       403:
   *         description: Session timed out or invalid refresh token.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
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
