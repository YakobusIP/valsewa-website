import { Router } from "express";
import { PublicUserService } from "../services/publicUser.service";
import { PublicUserController } from "../controllers/publicUser.controller";
import { authMiddleware } from "../middleware/auth.middleware";

class PublicUserRouter {
  public router: Router;
  private publicUserService: PublicUserService;
  private publicUserController: PublicUserController;

  constructor() {
    this.router = Router();
    this.publicUserService = new PublicUserService();
    this.publicUserController = new PublicUserController(
      this.publicUserService
    );
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      authMiddleware,
      this.publicUserController.getAllPublicUsers
    );

    this.router.put(
      "/:id/password",
      authMiddleware,
      this.publicUserController.updatePassword
    );

    this.router.post(
      "/",
      authMiddleware,
      this.publicUserController.createPublicUser
    );
  }
}

export default new PublicUserRouter().router;
