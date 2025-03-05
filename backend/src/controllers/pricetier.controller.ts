import { Request, Response, NextFunction } from "express";
import { PriceTierService } from "../services/pricetier.service";

/**
 * @openapi
 * components:
 *   schemas:
 *     PriceTier:
 *       type: object
 *       required:
 *         - id
 *         - code
 *         - description
 *       properties:
 *         id:
 *           type: number
 *         code:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Metadata:
 *       type: object
 *       properties:
 *         page:
 *           type: number
 *         limit:
 *           type: number
 *         pageCount:
 *           type: number
 *         total:
 *           type: number
 */

export class PriceTierController {
  constructor(private readonly priceTierService: PriceTierService) {}

  /**
   * @openapi
   * /api/price-tiers:
   *   get:
   *     tags:
   *       - Price Tiers
   *     summary: Retrieve a paginated list of price tiers.
   *     security:
   *       - bearerAuth: []
   *     description: Returns a list of price tiers along with pagination metadata. Optionally filters by a search query.
   *     parameters:
   *       - in: query
   *         name: page
   *         required: false
   *         schema:
   *           type: string
   *         description: The page number for pagination.
   *       - in: query
   *         name: limit
   *         required: false
   *         schema:
   *           type: string
   *         description: The number of items per page.
   *       - in: query
   *         name: q
   *         required: false
   *         schema:
   *           type: string
   *         description: Optional search query.
   *     responses:
   *       200:
   *         description: A list of price tiers with pagination metadata.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/PriceTier'
   *                 metadata:
   *                   $ref: '#/components/schemas/Metadata'
   */
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

  /**
   * @openapi
   * /api/price-tiers/{id}:
   *   get:
   *     tags:
   *       - Price Tiers
   *     summary: Retrieve a price tier by ID.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The unique identifier of the price tier.
   *     responses:
   *       200:
   *         description: The details of the price tier.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: '#/components/schemas/PriceTier'
   */
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

  /**
   * @openapi
   * /api/price-tiers:
   *   post:
   *     tags:
   *       - Price Tiers
   *     summary: Create a new price tier.
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PriceTier'
   *     responses:
   *       201:
   *         description: Price tier created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
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

  /**
   * @openapi
   * /api/price-tiers/{id}:
   *   put:
   *     tags:
   *       - Price Tiers
   *     summary: Update an existing price tier.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the price tier to update.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PriceTier'
   *     responses:
   *       201:
   *         description: Price tier updated successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
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

  /**
   * @openapi
   * /api/price-tiers:
   *   delete:
   *     tags:
   *       - Price Tiers
   *     summary: Delete multiple price tiers.
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               ids:
   *                 type: array
   *                 items:
   *                   type: number
   *     responses:
   *       204:
   *         description: Price tiers deleted successfully.
   */
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
