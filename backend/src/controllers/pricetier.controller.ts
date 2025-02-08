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
      const page = req.query.page as string;
      const limit = req.query.limit as string;
      const query = req.query.q as string;

      if (!page || !limit) {
        throw new UnprocessableEntityError("Pagination query params missing!");
      }

      const [data, metadata] = await this.priceTierService.getAllPriceTiers(
        parseInt(page),
        parseInt(limit),
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
