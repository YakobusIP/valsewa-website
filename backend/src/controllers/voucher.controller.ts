import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../lib/error";
import { VoucherService } from "../services/voucher.service";

const toOptionalNumber = (value: unknown): number | null => {
  if (value === "" || value == null) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new BadRequestError("Invalid numeric value");
  }
  return parsed;
};

export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  getAllVouchers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ?? undefined;
      const limit = req.query.limit ?? undefined;
      const query = req.query.q as string;

      const [data, metadata] = await this.voucherService.getAll(
        page ? parseInt(page as string) : undefined,
        limit ? parseInt(limit as string) : undefined,
        query
      );

      return res.json({ data, metadata });
    } catch (error) {
      return next(error);
    }
  };

  getVoucherById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await this.voucherService.findById(Number(id));
      return res.json({ data });
    } catch (error) {
      return next(error);
    }
  };

  getActiveVouchers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.voucherService.getActiveVouchers();

      return res.json(data);
    } catch (error) {
      return next(error);
    }
  };

  getActiveVoucherByVoucherCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { voucherCode } = req.params;

      const data =
        await this.voucherService.getActiveVoucherByVoucherCode(voucherCode);

      return res.json(data);
    } catch (error) {
      return next(error);
    }
  };

  getUsageSummary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const data = await this.voucherService.getUsageSummary(Number(id));
      return res.json({ data });
    } catch (error) {
      return next(error);
    }
  };

  getUsageBookings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

      const [data, metadata] = await this.voucherService.getUsageBookings(
        Number(id),
        page,
        limit
      );

      return res.json({ data, metadata });
    } catch (error) {
      return next(error);
    }
  };

  createVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        voucherCode,
        voucherName,
        type,
        percentage,
        nominal,
        maxDiscount,
        minOrderValue,
        maxGlobalUsage,
        maxUsagePerUser,
        dateStart,
        dateEnd
      } = req.body;

      await this.voucherService.create({
        voucherCode,
        voucherName,
        type,
        percentage,
        nominal,
        maxDiscount,
        minOrderValue: toOptionalNumber(minOrderValue),
        maxGlobalUsage: toOptionalNumber(maxGlobalUsage),
        maxUsagePerUser: toOptionalNumber(maxUsagePerUser),
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd)
      });

      return res.status(201).json({
        message: "Voucher created successfully"
      });
    } catch (error) {
      return next(error);
    }
  };

  updateVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { minOrderValue, maxGlobalUsage, maxUsagePerUser, dateEnd } =
        req.body;

      const lockedFields = [
        "type",
        "percentage",
        "nominal",
        "maxDiscount",
        "dateStart",
        "isValid",
        "isVisible",
        "voucherCode",
        "voucherName"
      ] as const;

      for (const field of lockedFields) {
        if (req.body[field] !== undefined) {
          throw new BadRequestError(`${field} cannot be updated`);
        }
      }

      await this.voucherService.update(Number(id), {
        ...(minOrderValue !== undefined && {
          minOrderValue: toOptionalNumber(minOrderValue)
        }),
        ...(maxGlobalUsage !== undefined && {
          maxGlobalUsage: toOptionalNumber(maxGlobalUsage)
        }),
        ...(maxUsagePerUser !== undefined && {
          maxUsagePerUser: toOptionalNumber(maxUsagePerUser)
        }),
        ...(dateEnd !== undefined && { dateEnd: new Date(dateEnd) })
      });

      return res.status(200).json({ message: "Voucher updated successfully" });
    } catch (error) {
      return next(error);
    }
  };

  toggleVoucherStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await this.voucherService.toggleStatus(Number(id));

      return res.status(200).json({ message: "Voucher status updated" });
    } catch (error) {
      return next(error);
    }
  };

  toggleVoucherVisible = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await this.voucherService.toggleVisibility(Number(id));

      return res.status(200).json({ message: "Voucher visibility updated" });
    } catch (error) {
      return next(error);
    }
  };

  deleteVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.voucherService.remove(Number(id));

      return res.status(200).json({ message: "Voucher deleted" });
    } catch (error) {
      return next(error);
    }
  };

  toggleValidity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { isValid } = req.body;

      await this.voucherService.toggleVoucherValidity(
        Number(id),
        Boolean(isValid)
      );

      return res.status(200).json({
        message: "Voucher validity updated"
      });
    } catch (error) {
      return next(error);
    }
  };

  checkExpiration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.voucherService.checkVoucherExpiration();
      return res.status(200).json({
        message: "Voucher expiration check completed",
        ...result
      });
    } catch (error) {
      return next(error);
    }
  };
}
