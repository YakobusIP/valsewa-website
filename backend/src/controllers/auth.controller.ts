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
import { StringValue } from "ms";

const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET || "access_token_secret";
const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET || "refresh_token_secret";

const PUB_ACCESS_TOKEN_SECRET =
  env.PUB_ACCESS_TOKEN_SECRET || "pub_access_token_secret";
const PUB_REFRESH_TOKEN_SECRET =
  env.PUB_REFRESH_TOKEN_SECRET || "pub_refresh_token_secret";

type TokenPayload = {
  username: string;
};

type PubTokenPayload = {
  id: number;
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
          expiresIn: env.ACCESS_TOKEN_DURATION as StringValue
        });

        const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET, {
          expiresIn: env.REFRESH_TOKEN_DURATION as StringValue
        });

        res.status(200).json({ accessToken, refreshToken, username });
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

  // TODO: add token version in the token so we can track which refresh token is allowed
  logout = async (_: Request, res: Response) => {
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
      if (error instanceof UnauthorizedError) {
        return next(error);
      }
      return next(new InternalServerError((error as Error).message));
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader) {
        throw new UnauthorizedError("Access denied. No token provided!");
      }

      const token = authHeader.split(" ")[1];

      jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err)
          return next(
            new ForbiddenError(
              "Invalid token! Please log back into the website!"
            )
          );

        const payload = decoded as TokenPayload;

        const accessToken = jwt.sign(
          { username: payload.username },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: env.ACCESS_TOKEN_DURATION as StringValue
          }
        );

        const refreshToken = jwt.sign(
          { username: payload.username },
          REFRESH_TOKEN_SECRET,
          {
            expiresIn: env.REFRESH_TOKEN_DURATION as StringValue
          }
        );

        return res.status(200).json({ accessToken, refreshToken });
      });
    } catch (error) {
      if (error instanceof ForbiddenError) {
        return next(error);
      }
      return next(new InternalServerError((error as Error).message));
    }
  };

  publogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new BadRequestError("Invalid request body!");
      }
      
      const { valid, id } = await this.authService.publogin(username, password);

      if (valid) {
        const accessToken = jwt.sign({ id, username }, PUB_ACCESS_TOKEN_SECRET, {
          expiresIn: env.PUB_ACCESS_TOKEN_DURATION as StringValue
        });

        const refreshToken = jwt.sign({ id, username }, PUB_REFRESH_TOKEN_SECRET, {
          expiresIn: env.PUB_REFRESH_TOKEN_DURATION as StringValue
        });

        res.status(200).json({
          pubAccessToken: accessToken,
          pubRefreshToken: refreshToken,
          username,
          id
        });
      } else {
        throw new UnauthorizedError("Wrong username or password");
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

  // TODO: add token version in the token so we can track which refresh token is allowed
  publogout = async (_: Request, res: Response) => {
    return res.status(200).json({ message: "Logged out successfully!" });
  };

  pubvalidateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader) {
        throw new UnauthorizedError("Access denied. No token provided!");
      }

      const token = authHeader.split(" ")[1];

      if (!token) throw new UnauthorizedError("Invalid token!");

      jwt.verify(token, PUB_ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid token!" });
        }

        const payload = decoded as PubTokenPayload;

        return res.json({ username: payload.username });
      });
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return next(error);
      }
      return next(new InternalServerError((error as Error).message));
    }
  };

  pubrefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader) {
        throw new UnauthorizedError("Access denied. No token provided!");
      }

      const token = authHeader.split(" ")[1];

      jwt.verify(token, PUB_REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err)
          return next(
            new ForbiddenError(
              "Invalid token! Please log back into the website!"
            )
          );

        const payload = decoded as PubTokenPayload;

        const accessToken = jwt.sign(
          { username: payload.username },
          PUB_ACCESS_TOKEN_SECRET,
          {
            expiresIn: env.PUB_ACCESS_TOKEN_DURATION as StringValue
          }
        );

        const refreshToken = jwt.sign(
          { username: payload.username },
          PUB_REFRESH_TOKEN_SECRET,
          {
            expiresIn: env.PUB_REFRESH_TOKEN_DURATION as StringValue
          }
        );

        return res
          .status(200)
          .json({ pubAccessToken: accessToken, pubRefreshToken: refreshToken });
      });
    } catch (error) {
      if (error instanceof ForbiddenError) {
        return next(error);
      }
      return next(new InternalServerError((error as Error).message));
    }
  };
}
