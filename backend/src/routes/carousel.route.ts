import { Router } from "express";
import { CarouselSlideService } from "../services/carousel.service";
import { CarouselSlideController } from "../controllers/carousel.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { UploadService } from "../services/upload.service";

class CarouselSlideRouter {
  public router: Router;
  private carouselSlideService: CarouselSlideService;
  private carouselSlideController: CarouselSlideController;

  constructor() {
    this.router = Router();
    this.carouselSlideService = new CarouselSlideService(new UploadService());
    this.carouselSlideController = new CarouselSlideController(
      this.carouselSlideService
    );
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.carouselSlideController.getAllSlides);
    this.router.post(
      "/",
      authMiddleware,
      this.carouselSlideController.addSlide
    );
    this.router.put(
      "/:id",
      authMiddleware,
      this.carouselSlideController.updateSlide
    );
    this.router.delete(
      "/:id",
      authMiddleware,
      this.carouselSlideController.deleteSlide
    );
  }
}

export default new CarouselSlideRouter().router;
