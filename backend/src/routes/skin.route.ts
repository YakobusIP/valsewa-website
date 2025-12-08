import { Router } from "express";
import { SkinService } from "../services/skin.service";
import { SkinController } from "../controllers/skin.controller";
import { authMiddleware } from "../middleware/auth.middleware";

class SkinRouter {
  public router: Router;
  private skinService: SkinService;
  private skinController: SkinController;

  constructor() {
    this.router = Router();
    this.skinService = new SkinService();
    this.skinController = new SkinController(this.skinService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
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
