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
        include: { image123: true, image126: true, image129: true }
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
      image123Id: number;
      image126Id: number;
      image129Id: number;
      duration: number;
    }>
  ) => {
    try {
      const currentSlide = await prisma.carouselSlide.findFirst({
        where: { id },
        select: { image123Id: true, image126Id: true, image129Id: true }
      });

      if (!currentSlide) throw new NotFoundError("Carousel not found!");

      const updateData: {
        image123Id?: number;
        image126Id?: number;
        image129Id?: number;
        duration?: number;
      } = {};
      const toDelete: number[] = [];

      if (data.duration !== undefined) {
        updateData.duration = data.duration;
      }

      if (data.image123Id !== undefined) {
        updateData.image123Id = data.image123Id;
        if (currentSlide.image123Id !== data.image123Id)
          toDelete.push(currentSlide.image123Id);
      }

      if (data.image126Id !== undefined) {
        updateData.image126Id = data.image126Id;
        if (currentSlide.image126Id !== data.image126Id)
          toDelete.push(currentSlide.image126Id);
      }

      if (data.image129Id !== undefined) {
        updateData.image129Id = data.image129Id;
        if (currentSlide.image129Id !== data.image129Id)
          toDelete.push(currentSlide.image129Id);
      }

      const result = await prisma.carouselSlide.update({
        where: { id },
        data: updateData
      });

      if (toDelete.length) {
        await Promise.all(
          toDelete.map((oldId) =>
            this.uploadService.deleteImage(oldId, "carousel-images")
          )
        );
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
        select: { image123Id: true, image126Id: true, image129Id: true }
      });

      if (!currentSlide) throw new NotFoundError("Carousel not found!");

      const result = await prisma.carouselSlide.deleteMany({ where: { id } });

      await Promise.all([
        this.uploadService.deleteImage(
          currentSlide.image123Id,
          "carousel-images"
        ),
        this.uploadService.deleteImage(
          currentSlide.image126Id,
          "carousel-images"
        ),
        this.uploadService.deleteImage(
          currentSlide.image129Id,
          "carousel-images"
        )
      ]);

      return result;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
