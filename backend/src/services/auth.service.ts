import {
  InternalServerError,
  UnauthorizedError,
  BadRequestError
} from "../lib/error";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export class AuthService {
  async login(username: string, password: string) {
    try {
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) {
        throw new UnauthorizedError("Invalid credentials!");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      return isPasswordValid;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedError((error as Error).message);
      }

      throw new InternalServerError((error as Error).message);
    }
  }

  async publogin(username: string, password: string) {
    try {
      const user = await prisma.publicUser.findUnique({ where: { username } });

      if (!user) {
        throw new UnauthorizedError("Wrong username or password");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      return isPasswordValid;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedError((error as Error).message);
      }

      throw new InternalServerError((error as Error).message);
    }
  }

  async register(username: string, password: string) {
    try {
      // Check if user already exists
      const existingUser = await prisma.publicUser.findUnique({
        where: { username }
      });

      if (existingUser) {
        throw new BadRequestError("Username already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.publicUser.create({
        data: {
          username,
          password: hashedPassword,
          passwordChangedAt: new Date(),
          is_active: true
        }
      });

      return user;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }
}
