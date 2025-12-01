import { Prisma } from "@prisma/client";
import { BadRequestError, InternalServerError } from "../lib/error";
import { prisma } from "../lib/prisma";
import { Metadata } from "../types/metadata.type";
import bcrypt from "bcrypt";

export class PublicUserService {
  getAllPublicUsers = async (
    page?: number,
    limit?: number,
    query?: string
  ): Promise<[any[], Metadata]> => {
    try {
      const whereCriteria: Prisma.PublicUserWhereInput = query
        ? { username: { contains: query, mode: "insensitive" } }
        : {};

      let data;
      let metadata: Metadata;

      if (page !== undefined && limit !== undefined) {
        const skip = (page - 1) * limit;

        data = await prisma.publicUser.findMany({
          where: whereCriteria,
          take: limit,
          skip,
          select: {
            id: true,
            username: true,
            is_active: true,
            createdAt: true
          }
        });

        const itemCount = await prisma.publicUser.count({
          where: whereCriteria
        });

        const pageCount = Math.ceil(itemCount / limit);

        metadata = {
          page,
          limit,
          pageCount,
          total: itemCount
        };
      } else {
        data = await prisma.publicUser.findMany({
          where: whereCriteria,
          select: {
            id: true,
            username: true,
            is_active: true,
            createdAt: true
          }
        });

        metadata = {
          page: 0,
          limit: 0,
          pageCount: 0,
          total: 0
        };
      }
      return [data, metadata];
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  updatePassword = async (id: number, newPassword: string) => {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const user = await prisma.publicUser.update({
        where: { id },
        data: {
          password: hashedPassword
        }
      });

      return user;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  createPublicUser = async (username: string, password: string) => {
    try {
      const existing = await prisma.publicUser.findUnique({
        where: { username }
      });

      if (existing) {
        throw new BadRequestError("Username already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.publicUser.create({
        data: {
          username,
          password: hashedPassword,
          is_active: true
        }
      });

      return user;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
