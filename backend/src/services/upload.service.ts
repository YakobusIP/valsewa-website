import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { generateFilename } from "../lib/utils";
import { bucket } from "../lib/storage";
import { existsSync, unlinkSync, writeFileSync } from "fs";
import { env } from "../lib/env";
import path from "path";
import {
  BadRequestError,
  FileStorageError,
  InternalServerError,
  NotFoundError
} from "../lib/error";

export class UploadService {
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

  async uploadImage(files: Express.Multer.File[]) {
    const uploadPromises = files.map(async (file) => {
      try {
        const filename = generateFilename(file.originalname);
        const filePath = `review-images/${filename}`;
        let url: string;

        if (env.NODE_ENV === "production") {
          const blob = bucket.file(filePath);
          const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype
          });

          await new Promise<void>((resolve, reject) => {
            blobStream.on("error", (error) => {
              reject(new FileStorageError(error.message));
            });
            blobStream.on("finish", () => resolve());
            blobStream.end(file.buffer);
          });

          url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        } else {
          const localPath = path.join(__dirname, "../uploads", filename);

          try {
            writeFileSync(localPath, file.buffer);
          } catch (error) {
            throw new FileStorageError((error as Error).message);
          }

          url = `http://localhost:${env.PORT}/uploads/${filename}`;
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

  async deleteImage(id: number) {
    try {
      const reviewImage = await prisma.imageUpload.findUnique({
        where: { id }
      });

      if (!reviewImage) {
        throw new NotFoundError("Image not found!");
      }

      const urlParts = reviewImage.imageUrl.split("/");

      if (env.NODE_ENV === "production") {
        const filename = `review-images/${urlParts[urlParts.length - 1]}`;
        const file = bucket.file(filename);
        try {
          await file.delete();
        } catch (error) {
          throw new FileStorageError((error as Error).message);
        }
      } else {
        const filename = urlParts[urlParts.length - 1];
        const localPath = path.join(__dirname, "../uploads", filename);
        try {
          if (existsSync(localPath)) {
            unlinkSync(localPath);
          }
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
