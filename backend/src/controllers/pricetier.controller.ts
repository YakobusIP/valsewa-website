import { Request, Response, NextFunction } from "express";
import { PriceTierService } from "../services/pricetier.service";

export class PriceTierController {
  constructor(private readonly priceTierService: PriceTierService) {}

  getAllPriceTiers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const priceTiers = await this.priceTierService.getAllPriceTiers();

      return res.json({ data: priceTiers });
    } catch (error) {
      return next(error);
    }
  };

  getPriceTierById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const priceTier = await this.priceTierService.getPriceTierById(
        parseInt(req.params.id)
      );

      return res.json({ data: priceTier });
    } catch (error) {
      return next(error);
    }
  };

  createPriceTier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.priceTierService.createPriceTier(req.body.data);

      return res
        .status(201)
        .json({ message: "Price tier created successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  updatePriceTier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.priceTierService.updatePriceTier(
        parseInt(req.params.id),
        req.body
      );

      return res
        .status(201)
        .json({ message: "Price tier updated successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  deleteManyPriceTiers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.priceTierService.deleteManyPriceTiers(req.body.ids);

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };
}
