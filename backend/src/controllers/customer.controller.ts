import { Request, Response, NextFunction } from "express";
import { CustomerService } from "../services/customer.service";

export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ?? undefined;
      const limit = req.query.limit ?? undefined;
      const query = req.query.q as string;

      const [data, metadata] = await this.customerService.getAllCustomers(
        page ? parseInt(page as string) : undefined,
        limit ? parseInt(limit as string) : undefined,
        query
      );
      console.log("Users from service:", data);

      return res.json({ data, metadata });
    } catch (error) {
      return next(error);
    }
  };

  updatePassword = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { password } = req.body;

      await this.customerService.updatePassword(Number(id), password);

      res.status(200).json({
        message: "Password updated"
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update password"
      });
    }
  };

  createCustomer = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      await this.customerService.createCustomer(username, password);

      res.status(201).json({
        message: "User created successfully"
      });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message
      });
    }
  };

  toggleActiveStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      await this.customerService.toggleCustomerActiveStatus(
        Number(id),
        Boolean(isActive)
      );

      res.status(200).json({
        message: "Customer active status updated"
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update customer active status"
      });
    }
  };

  checkPasswordExpiration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.customerService.checkPasswordExpiration();
      return res.json({
        message: "Customer password expiration check completed",
        ...result
      });
    } catch (error) {
      return next(error);
    }
  };
}
