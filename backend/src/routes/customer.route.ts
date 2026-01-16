import { Router } from "express";
import { CustomerService } from "../services/customer.service";
import { CustomerController } from "../controllers/customer.controller";
import { authMiddleware } from "../middleware/auth.middleware";

class CustomerRouter {
  public router: Router;
  private customerService: CustomerService;
  private customerController: CustomerController;

  constructor() {
    this.router = Router();
    this.customerService = new CustomerService();
    this.customerController = new CustomerController(this.customerService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      authMiddleware,
      this.customerController.getAllCustomers
    );

    this.router.put(
      "/:id/password",
      authMiddleware,
      this.customerController.updatePassword
    );

    this.router.post(
      "/",
      authMiddleware,
      this.customerController.createCustomer
    );
    this.router.patch(
      "/:id/active-status",
      authMiddleware,
      this.customerController.toggleActiveStatus
    );
  }
}

export default new CustomerRouter().router;
