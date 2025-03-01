import { Router } from "express";
import { PriceTierService } from "../services/pricetier.service";
import { PriceTierController } from "../controllers/pricetier.controller";
import { authMiddleware } from "../middleware/auth.middleware";

class PriceTierRouter {
  public router: Router;
  private priceTierService: PriceTierService;
  private priceTierController: PriceTierController;

  constructor() {
    this.router = Router();
    this.priceTierService = new PriceTierService();
    this.priceTierController = new PriceTierController(this.priceTierService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      authMiddleware,
      this.priceTierController.getAllPriceTiers
    );
    this.router.get(
      "/:id",
      authMiddleware,
      this.priceTierController.getPriceTierById
    );
    this.router.post(
      "/",
      authMiddleware,
      this.priceTierController.createPriceTier
    );
    this.router.put(
      "/:id",
      authMiddleware,
      this.priceTierController.updatePriceTier
    );
    this.router.delete(
      "/",
      authMiddleware,
      this.priceTierController.deleteManyPriceTiers
    );
  }
}

export default new PriceTierRouter().router;
