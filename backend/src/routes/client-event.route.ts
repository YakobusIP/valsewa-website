import { Router } from "express";
import { ClientEventController } from "../controllers/client-event.controller";
import { customerMiddleware } from "../middleware/customer.middleware";

class ClientEventRouter {
  public router: Router;
  private clientEventController: ClientEventController;

  constructor() {
    this.router = Router();
    this.clientEventController = new ClientEventController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      customerMiddleware,
      this.clientEventController.logClientEvent
    );
  }
}

export default new ClientEventRouter().router;
