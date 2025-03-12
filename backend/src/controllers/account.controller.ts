import { Request, Response, NextFunction } from "express";
import { AccountService } from "../services/account.service";
import { UnprocessableEntityError } from "../lib/error";
import { RankService } from "../services/rank.service";
import { Prisma } from "@prisma/client";
import { updateAllAccountRankQueue } from "../lib/queues/accountrank.queue";

/**
 * @openapi
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - accountCode
 *         - accountRank
 *         - availabilityStatus
 *       properties:
 *         id:
 *           type: number
 *         username:
 *           type: string
 *         accountCode:
 *           type: string
 *         description:
 *           type: string
 *         accountRank:
 *           type: string
 *         availabilityStatus:
 *           type: string
 *         nextBooking:
 *           type: string
 *           format: date-time
 *         nextBookingDuration:
 *           type: number
 *         expireAt:
 *           type: string
 *           format: date-time
 *         totalRentHour:
 *           type: number
 *         password:
 *           type: string
 *         passwordUpdatedAt:
 *           type: string
 *           format: date-time
 *         skinList:
 *           type: array
 *           items:
 *             type: string
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
 *   securitySchemes:
 *     apiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: api-key
 */

export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly rankService: RankService
  ) {}

  /**
   * @openapi
   * /api/accounts:
   *   get:
   *     tags:
   *       - Accounts
   *     summary: Retrieve a paginated list of accounts.
   *     description: Retrieves accounts with optional filtering and sorting.
   *     parameters:
   *       - in: query
   *         name: page
   *         required: true
   *         schema:
   *           type: string
   *         description: The page number.
   *       - in: query
   *         name: limit
   *         required: true
   *         schema:
   *           type: string
   *         description: The number of accounts per page.
   *       - in: query
   *         name: q
   *         required: false
   *         schema:
   *           type: string
   *         description: Optional search query.
   *       - in: query
   *         name: sortBy
   *         required: false
   *         schema:
   *           type: string
   *         description: Field name to sort by.
   *       - in: query
   *         name: direction
   *         required: false
   *         schema:
   *           type: string
   *         description: Sort order (asc or desc).
   *     responses:
   *       200:
   *         description: A list of accounts with pagination metadata.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Account'
   *                 metadata:
   *                   $ref: '#/components/schemas/Metadata'
   */
  getAllAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page as string;
      const limit = req.query.limit as string;
      const query = req.query.q as string;
      const sortBy = req.query.sortBy as string;
      const direction = req.query.direction as Prisma.SortOrder;

      if (!page || !limit) {
        throw new UnprocessableEntityError("Pagination query params missing!");
      }

      const [data, metadata] = await this.accountService.getAllAccounts(
        parseInt(page),
        parseInt(limit),
        query,
        sortBy,
        direction
      );

      return res.json({ data, metadata });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @openapi
   * /api/accounts/{id}:
   *   get:
   *     tags:
   *       - Accounts
   *     summary: Retrieve a single account by ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The unique identifier of the account.
   *     responses:
   *       200:
   *         description: The account details.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Account'
   */
  getAccountById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const account = await this.accountService.getAccountById(
        parseInt(req.params.id)
      );

      return res.json({ ...account });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @openapi
   * /api/accounts/rank/{name}/{tag}:
   *   get:
   *     tags:
   *       - Accounts
   *     summary: Retrieve an account's rank.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: name
   *         required: true
   *         schema:
   *           type: string
   *         description: The account's name.
   *       - in: path
   *         name: tag
   *         required: true
   *         schema:
   *           type: string
   *         description: The account's tag.
   *     responses:
   *       200:
   *         description: The account's rank information.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *                 tag:
   *                   type: string
   *                 currentRank:
   *                   type: string
   */
  getAccountRank = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rankResponse = await this.rankService.getSingleAccountRank(
        req.params.name,
        req.params.tag
      );

      const data = rankResponse?.data;

      return res.json({
        name: data?.name,
        tag: data?.tag,
        currentRank: data?.current_data.currenttierpatched
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @openapi
   * /api/accounts/rank/{name}/{tag}:
   *   get:
   *     tags:
   *       - Accounts
   *     summary: Retrieve an account's rank.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: name
   *         required: true
   *         schema:
   *           type: string
   *         description: The account's name.
   *       - in: path
   *         name: tag
   *         required: true
   *         schema:
   *           type: string
   *         description: The account's tag.
   *       - in: path
   *         name: code
   *         required: true
   *         schema:
   *           type: string
   *         description: The account's code.
   *     responses:
   *       200:
   *         description: Returns true if duplicate account is found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 exists:
   *                   type: boolean
   */
  getAccountDuplicate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const username = `${req.params.name}#${req.params.tag}`;
      const exists = await this.accountService.getAccountDuplicate(
        username,
        req.params.code
      );
      return res.json({ exists });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @openapi
   * /api/accounts:
   *   post:
   *     tags:
   *       - Accounts
   *     summary: Create a new account.
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Account'
   *     responses:
   *       201:
   *         description: Account created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.accountService.createAccount(req.body);

      return res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @openapi
   * /api/accounts/{id}:
   *   put:
   *     tags:
   *       - Accounts
   *     summary: Update an existing account.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the account to update.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Account'
   *     responses:
   *       201:
   *         description: Account updated successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  updateAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.accountService.updateAccount(
        parseInt(req.params.id),
        req.body
      );

      return res.status(201).json({ message: "Account updated successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @openapi
   * /api/accounts/update-rank:
   *   put:
   *     tags:
   *       - Accounts
   *     summary: Update the rank for all accounts.
   *     security:
   *       - apiKeyAuth: []
   *     responses:
   *       200:
   *         description: Successfully updated ranks for all accounts.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  updateAllAccountsRank = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accounts = await this.accountService.getAllDatabaseAccounts();

      accounts.forEach((account) => {
        updateAllAccountRankQueue.add({
          id: account.id,
          username: account.username
        });
      });

      return res.json({
        message: `${accounts.length} account(s) updated successfully!`
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @openapi
   * /api/accounts:
   *   delete:
   *     tags:
   *       - Accounts
   *     summary: Delete multiple accounts.
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
   *         description: Accounts deleted successfully.
   */
  deleteManyAccounts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.accountService.deleteManyAccounts(req.body.ids);

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };
}
