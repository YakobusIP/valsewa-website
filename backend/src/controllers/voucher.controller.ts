import { Request, Response, NextFunction } from "express";
import { VoucherService } from "../services/voucher.service";

export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  getAllVouchers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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

  createVoucher = async (req: Request, res: Response) => {
    try {
      const {
        voucher_name,
        type,
        percentage,
        nominal,
        max_discount,
        date_start,
        date_end
      } = req.body;

      await this.voucherService.create({
        voucher_name,
        type,
        percentage,
        nominal,
        max_discount,
        date_start: new Date(date_start),
        date_end: new Date(date_end)
      });

      res.status(201).json({
        message: "Voucher created successfully"
      });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message
      });
    }
  };

  toggleVoucherStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await this.voucherService.toggleStatus(Number(id));

      res.json({ message: "Voucher status updated" });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message
      });
    }
  };

  deleteVoucher = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await this.voucherService.remove(Number(id));

      res.json({ message: "Voucher deleted" });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message
      });
    }
  };
}
