import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../lib/error";
import { FaspayService } from "../services/faspay.service";

export class FaspayController {
  constructor(private readonly faspayService: FaspayService) {}

  vaInquiry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("[vaInquiry] Processing faspay virtual account inquiry with request:", req);

      const {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId
      } = req.body;

      const requiredFields = {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => value === undefined || value === null || value === "")
        .map(([key]) => key);

      if (missingFields.length > 0) {
        throw new BadRequestError(
          `Missing required field(s): ${missingFields.join(", ")}`
        );
      }

      const result = await this.faspayService.vaInquiry({
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId
      });

      console.log("[vaInquiry] Processed faspay virtual account inquiry with result:", result);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  vaPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("[vaPayment] Processing faspay virtual account payment with request:", req);

      const {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        paymentRequestId,
        paidAmount,
        trxDateTime,
        referenceNo
      } = req.body;

      const requiredFields = {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        paymentRequestId,
        paidAmount,
        trxDateTime,
        referenceNo,
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => value === undefined || value === null || value === "")
        .map(([key]) => key);

      if (missingFields.length > 0) {
        throw new BadRequestError(
          `Missing required field(s): ${missingFields.join(", ")}`
        );
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

      console.log("[vaPayment] Processed faspay virtual account payment with result:", result);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
}
