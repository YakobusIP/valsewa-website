import { Request, Response, NextFunction } from "express";
import { VoucherService } from "../services/voucher.service";

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

  getActiveVoucherByVoucherName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { voucherName } = req.params;

      const data = await this.voucherService.getActiveVoucherByVoucherName(voucherName);

      return res.json(data);
    } catch (error) {
      return next(error);
    }
  }

  createVoucher = async (req: Request, res: Response) => {
    try {
      const {
        voucherName,
        type,
        percentage,
        nominal,
        maxDiscount,
        dateStart,
        dateEnd
      } = req.body;

      await this.voucherService.create({
        voucherName,
        type,
        percentage,
        nominal,
        maxDiscount,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd)
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

  toggleVoucherVisible = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await this.voucherService.toggleVisibility(Number(id));

      res.json({ message: "Voucher visibility updated" });
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
