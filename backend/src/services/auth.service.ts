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
      const user = await prisma.customer.findUnique({ where: { username } });

      if (!user) {
        throw new UnauthorizedError("Wrong username or password");
      }

      if (!user.isActive) {
        throw new UnauthorizedError(
          "Password already Expired, Please contact our team"
        );
      }

      const passwordExpiredAt = new Date(user.passwordChangedAt);
      passwordExpiredAt.setDate(passwordExpiredAt.getDate() + 30);
      console.log(new Date());
      if (new Date() > passwordExpiredAt) {
        throw new UnauthorizedError(
          "Password already expired, Please contact our team"
        );
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
      const existingUser = await prisma.customer.findUnique({
        where: { username }
      });

      if (existingUser) {
        throw new BadRequestError("Username already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.customer.create({
        data: {
          username,
          password: hashedPassword,
          passwordChangedAt: new Date(),
          isActive: true
        }
      });

      return user;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }
}
