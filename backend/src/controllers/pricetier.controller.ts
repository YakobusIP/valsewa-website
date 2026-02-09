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

  getPriceListByTierId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tierId = parseInt(req.params.tierId);
      const tier = await this.priceTierService.getPriceTierById(tierId);

      return res.json({ data: tier.priceList, metadata: { tierId } });
    } catch (error) {
      return next(error);
    }
  };

  addPriceListItems = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tierId = parseInt(req.params.tierId, 10);
      const { items } = req.body as {
        items: { duration: string; normalPrice: number; lowPrice: number }[];
      };

      if (!Array.isArray(items) || items.length === 0) {
        return res
          .status(400)
          .json({ message: "Body.items must be a non-empty array." });
      }

      const created = await this.priceTierService.addPriceListItems(
        tierId,
        items
      );
      return res
        .status(201)
        .json({ data: created, message: "Price list items created." });
    } catch (error) {
      return next(error);
    }
  };

  updatePriceListItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const itemId = parseInt(req.params.itemId, 10);
      const data = req.body as Partial<{
        duration: string;
        normalPrice: number;
        lowPrice: number;
      }>;

      const updated = await this.priceTierService.updatePriceListItem(
        itemId,
        data
      );
      return res.json({ data: updated, message: "Price list item updated." });
    } catch (error) {
      return next(error);
    }
  };

  deletePriceListItems = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { ids } = req.body as { ids: number[] };
      if (!Array.isArray(ids) || ids.length === 0) {
        return res
          .status(400)
          .json({ message: "Body.ids must be a non-empty array." });
      }

      await this.priceTierService.deletePriceListItems(ids);
      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };

  getPublicPrices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.priceTierService.getPublicPrices();
      return res.json({ data });
    } catch (error) {
      return next(error);
    }
  };
}
