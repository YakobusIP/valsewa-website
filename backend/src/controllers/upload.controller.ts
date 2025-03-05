import { Request, Response, NextFunction } from "express";
import { UploadService } from "../services/upload.service";
import { BadRequestError } from "../lib/error";

/**
 * @openapi
 * components:
 *   schemas:
 *     ImageUpload:
 *       type: object
 *       required:
 *         - id
 *         - imageUrl
 *       properties:
 *         id:
 *           type: number
 *         imageUrl:
 *           type: string
 *           description: URL of the uploaded image.
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * @openapi
   * /api/upload:
   *   post:
   *     tags:
   *       - Uploads
   *     summary: Upload image(s).
   *     security:
   *       - bearerAuth: []
   *     description: Accepts one or more image files uploaded via multipart/form-data and returns the uploaded image information.
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               files:
   *                 type: array
   *                 items:
   *                   type: string
   *                   format: binary
   *     responses:
   *       200:
   *         description: Image(s) uploaded successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ImageUpload'
   *       400:
   *         description: No files uploaded or invalid request.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        throw new BadRequestError("No files uploaded!");
      }

      const files = req.files as Express.Multer.File[];

      const image = await this.uploadService.uploadImage(files);

      return res.status(200).send(image);
    } catch (error) {
      return next(error);
    }
  };
}
