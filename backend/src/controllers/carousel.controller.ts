import { Request, Response, NextFunction } from "express";
import { CarouselSlideService } from "../services/carousel.service";

export class CarouselSlideController {
  constructor(private readonly carouselSlideService: CarouselSlideService) {}

  getAllSlides = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.carouselSlideService.getAllSlides();

      return res.json({ data });
    } catch (error) {
      return next(error);
    }
  };

  addSlide = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.carouselSlideService.addSlide(req.body);

      return res
        .status(201)
        .json({ message: "Carousel slide created successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  updateSlide = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.carouselSlideService.updateSlide(
        parseInt(req.params.id),
        req.body
      );

      return res
        .status(201)
        .json({ message: "Carousel slide updated successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  deleteSlide = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.carouselSlideService.deleteSlide(parseInt(req.params.id));

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };
}
