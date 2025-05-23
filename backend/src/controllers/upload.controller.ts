import { Request, Response, NextFunction } from "express";
import { UploadService } from "../services/upload.service";
import { BadRequestError } from "../lib/error";

export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  uploadAccountImages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const folder = req.params.folder;
      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        throw new BadRequestError("No files uploaded!");
      }

      const files = req.files as Express.Multer.File[];

      const image = await this.uploadService.uploadImage(files, folder);

      return res.status(200).send(image);
    } catch (error) {
      return next(error);
    }
  };
}
