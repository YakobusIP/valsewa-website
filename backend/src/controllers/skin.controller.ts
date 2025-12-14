import { Request, Response, NextFunction } from "express";
import { SkinService } from "../services/skin.service";
import { ImageService } from "../services/skin-image.service";

export class SkinController {
  constructor(
    private readonly skinService: SkinService,
    private readonly imageService: ImageService
  ) {}

  getAllSkins = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ?? undefined;
      const limit = req.query.limit ?? undefined;
      const query = req.query.q as string;

      const [data, metadata] = await this.skinService.getAllSkin(
        page ? parseInt(page as string) : undefined,
        limit ? parseInt(limit as string) : undefined,
        query
      );

      return res.json({ data, metadata });
    } catch (error) {
      return next(error);
    }
  };

  getSkinById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const priceTier = await this.skinService.getSkinById(
        parseInt(req.params.id)
      );

      return res.json({ data: priceTier });
    } catch (error) {
      return next(error);
    }
  };

  createSkin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.skinService.createSkin(req.body);

      return res.status(201).json({ message: "Skin created successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  updateSkin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.skinService.updateSkin(parseInt(req.params.id), req.body);

      return res.status(201).json({ message: "Skin updated successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  deleteManySkin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.skinService.deleteManySkins(req.body.ids);

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };

  getSkinImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = (req.query.name as string) ?? "";
      const result = await this.imageService.getSkinImage(name);
      return res.status(200).json({ data: result });
    } catch (error) {
      return next(error);
    }
  };
}
