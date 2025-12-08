import { Skin, Prisma } from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { prisma } from "../lib/prisma";
import { Metadata } from "../types/metadata.type";

export class SkinService {
  getAllSkin = async (
    page?: number,
    limit?: number,
    query?: string
  ): Promise<[Skin[], Metadata]> => {
    try {
      const trimmed = (query ?? '').trim();
      const whereCriteria: Prisma.SkinWhereInput | undefined = trimmed ? {
        OR: [
            {name: { contains: query, mode: "insensitive" },},
            {keyword: { contains: query, mode: "insensitive" },}
        ]
      } : undefined;

      let data: Skin[];
      let metadata: Metadata;

      if (page !== undefined && limit !== undefined) {
        const skip = (page - 1) * limit;

        data = await prisma.skin.findMany({
          where: whereCriteria,
          take: limit,
          skip: skip
        });

        const itemCount = await prisma.skin.count({
          where: whereCriteria
        });
        const pageCount = Math.ceil(itemCount / limit);

        metadata = {
          page: page,
          limit: limit,
          pageCount,
          total: itemCount
        };
      } else {
        data = await prisma.skin.findMany({
          where: whereCriteria
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

  getSkinById = async (id: number) => {
    try {
      const skin = await prisma.skin.findFirst({ where: { id } });

      if (!skin) throw new NotFoundError("Skin not found!");

      return skin;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  createSkin = async (data: Prisma.SkinCreateInput) => {
    try {
      return await prisma.skin.create({
        data
      })

    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new PrismaUniqueError("Skin name is already in use!");
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  updateSkin = async (id: number, data: Prisma.SkinUpdateInput) => {
    try {
      return await prisma.skin.update({ where: { id }, data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("Price tier not found!");
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new PrismaUniqueError("Price tier code is already in use!");
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  deleteManySkins = async (ids: number[]) => {
    try {
      return await prisma.priceTier.deleteMany({ where: { id: { in: ids } } });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
