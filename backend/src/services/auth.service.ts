import { InternalServerError, UnauthorizedError } from "../lib/error";
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

      if (!user.passwordExpireAt || new Date() > user.passwordExpireAt) {
        throw new UnauthorizedError(
          "Password already expired, Please contact our team"
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      return { valid: isPasswordValid, id: user.id };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedError((error as Error).message);
      }

      throw new InternalServerError((error as Error).message);
    }
  }

}
