import { Router } from "express";
import { SkinService } from "../services/skin.service";
import { SkinController } from "../controllers/skin.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { ImageService } from "../services/image.service";

class SkinRouter {
  public router: Router;
  private skinService: SkinService;
  private imageService: ImageService;
  private skinController: SkinController;

  constructor() {
    this.router = Router();
    this.skinService = new SkinService();
    this.imageService = new ImageService();
    this.skinController = new SkinController(this.skinService, this.imageService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/image",
      authMiddleware,
      this.skinController.getSkinImage
    );
    this.router.get(
      "/",
      authMiddleware,
      this.skinController.getAllSkins
    );
    this.router.get(
      "/:id",
      authMiddleware,
      this.skinController.getSkinById
    );
    this.router.post(
      "/",
      authMiddleware,
      this.skinController.createSkin
    );
    this.router.put(
      "/:id",
      authMiddleware,
      this.skinController.updateSkin
    );
    this.router.delete(
      "/",
      authMiddleware,
      this.skinController.deleteManySkin
    );
  }
}

export default new SkinRouter().router;
