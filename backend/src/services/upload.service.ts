import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { generateFilename } from "../lib/utils";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { env } from "../lib/env";
import path from "path";
import {
  BadRequestError,
  FileStorageError,
  InternalServerError,
  NotFoundError
} from "../lib/error";

export class UploadService {
  private static readonly IMAGES_ROOT = "/srv/images";
  private static readonly IMAGES_CDN = "https://images.valsewa.com";

  private async saveImageToDatabase(imageUrl: string) {
    try {
      return await prisma.imageUpload.create({ data: { imageUrl } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }

      throw new InternalServerError((error as Error).message);
    }
  }

  async uploadImage(files: Express.Multer.File[], folder: string) {
    const uploadPromises = files.map(async (file) => {
      try {
        const filename = generateFilename(file.originalname);
        const filePath = `${folder}/${filename}`;
        let url: string;

        if (env.NODE_ENV === "production") {
          const diskPath = path.join(UploadService.IMAGES_ROOT, filePath);
          mkdirSync(path.dirname(diskPath), { recursive: true });

          try {
            writeFileSync(diskPath, file.buffer);
          } catch (error) {
            throw new FileStorageError((error as Error).message);
          }

          url = `${UploadService.IMAGES_CDN}/${filePath}`;
        } else {
          const localPath = path.join(__dirname, "../uploads/", filePath);
          mkdirSync(path.dirname(localPath), { recursive: true });

          try {
            writeFileSync(localPath, file.buffer);
          } catch (error) {
            throw new FileStorageError((error as Error).message);
          }

          url = `http://localhost:${env.PORT}/uploads/${filePath}`;
        }
        return await this.saveImageToDatabase(url);
      } catch (error) {
        if (
          error instanceof BadRequestError ||
          error instanceof FileStorageError
        ) {
          throw error;
        }

        throw new InternalServerError((error as Error).message);
      }
    });

    return await Promise.all(uploadPromises);
  }

  async deleteImage(id: number, folder: string) {
    try {
      const record = await prisma.imageUpload.findUnique({
        where: { id }
      });

      if (!record) throw new NotFoundError("Image not found!");

      const urlParts = record.imageUrl.split("/");
      const filename = `${folder}/${urlParts[urlParts.length - 1]}`;

      if (env.NODE_ENV === "production") {
        const diskPath = path.join(UploadService.IMAGES_ROOT, filename);
        try {
          if (existsSync(diskPath)) unlinkSync(diskPath);
        } catch (error) {
          throw new FileStorageError((error as Error).message);
        }
      } else {
        const localPath = path.join(__dirname, "../uploads", filename);
        try {
          if (existsSync(localPath)) unlinkSync(localPath);
        } catch (error) {
          throw new FileStorageError((error as Error).message);
        }
      }

      await prisma.imageUpload.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof FileStorageError) {
        throw error;
      }

      throw new InternalServerError((error as Error).message);
    }
  }
}
