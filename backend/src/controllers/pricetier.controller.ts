import { Request, Response, NextFunction } from "express";
import { PriceTierService } from "../services/pricetier.service";
import { UnprocessableEntityError } from "../lib/error";

export class PriceTierController {
  constructor(private readonly priceTierService: PriceTierService) {}

  getAllPriceTiers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = req.query.page ?? undefined;
      const limit = req.query.limit ?? undefined;
      const query = req.query.q as string;

      const [data, metadata] = await this.priceTierService.getAllPriceTiers(
        page ? parseInt(page as string) : undefined,
        limit ? parseInt(limit as string) : undefined,
        query
      );

      return res.json({ data, metadata });
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
      await this.priceTierService.createPriceTier(req.body);

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
