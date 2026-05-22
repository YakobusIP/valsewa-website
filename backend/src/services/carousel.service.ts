import { Prisma } from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from "../lib/error";
import { prisma } from "../lib/prisma";
import { UploadService } from "./upload.service";

export class CarouselSlideService {
  constructor(private readonly uploadService: UploadService) {}

  getAllSlides = async () => {
    try {
      return await prisma.carouselSlide.findMany({
        include: { image: true }
      });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  addSlide = async (data: Prisma.CarouselSlideCreateInput) => {
    try {
      return await prisma.carouselSlide.create({ data });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  updateSlide = async (
    id: number,
    data: Partial<{
      imageId: number;
      duration: number;
    }>
  ) => {
    try {
      const currentSlide = await prisma.carouselSlide.findFirst({
        where: { id },
        select: { imageId: true }
      });

      if (!currentSlide) throw new NotFoundError("Carousel not found!");

      const updateData: {
        imageId?: number;
        duration?: number;
      } = {};
      let toDelete: number | null = null;

      if (data.duration !== undefined) {
        updateData.duration = data.duration;
      }

      if (data.imageId !== undefined) {
        updateData.imageId = data.imageId;
        if (currentSlide.imageId !== data.imageId)
          toDelete = currentSlide.imageId;
      }

      const result = await prisma.carouselSlide.update({
        where: { id },
        data: updateData
      });

      if (toDelete !== null) {
        await this.uploadService.deleteImage(toDelete, "carousel-images");
      }

      return result;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("Carousel not found!");
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  deleteSlide = async (id: number) => {
    try {
      const currentSlide = await prisma.carouselSlide.findFirst({
        where: { id },
        select: { imageId: true }
      });

      if (!currentSlide) throw new NotFoundError("Carousel not found!");

      const result = await prisma.carouselSlide.deleteMany({ where: { id } });

      await this.uploadService.deleteImage(
        currentSlide.imageId,
        "carousel-images"
      );

      return result;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
