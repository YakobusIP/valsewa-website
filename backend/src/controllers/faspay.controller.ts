import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../lib/error";
import { FaspayService } from "../services/faspay.service";

export class FaspayController {
  constructor(private readonly faspayService: FaspayService) {}

  vaInquiry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId
      } = req.body;

      if (
        !partnerServiceId ||
        !customerNo ||
        !virtualAccountNo ||
        !inquiryRequestId
      ) {
        throw new BadRequestError("Missing required fields.");
      }

      const result = await this.faspayService.vaInquiry({
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  vaPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        paymentRequestId,
        paidAmount,
        trxDateTime,
        referenceNo
      } = req.body;

      if (
        !partnerServiceId ||
        !customerNo ||
        !virtualAccountNo ||
        !paymentRequestId ||
        !paidAmount ||
        !trxDateTime ||
        !referenceNo
      ) {
        throw new BadRequestError("Missing required fields.");
      }

      const result = await this.faspayService.vaPayment({
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        paymentRequestId,
        paidAmount,
        trxDateTime,
        referenceNo
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
}
