import { Router } from "express";
import { PriceTierService } from "../services/pricetier.service";
import { PriceTierController } from "../controllers/pricetier.controller";

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
    this.router.get("/", this.priceTierController.getAllPriceTiers);
    this.router.get("/:id", this.priceTierController.getPriceTierById);
    this.router.post("/", this.priceTierController.createPriceTier);
    this.router.put("/:id", this.priceTierController.updatePriceTier);
    this.router.delete("/", this.priceTierController.deleteManyPriceTiers);
  }
}

export default new PriceTierRouter().router;
