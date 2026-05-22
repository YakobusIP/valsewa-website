import { Request, Response, NextFunction } from "express";
import { BadRequestError, ForbiddenError } from "../lib/error";
import { FaspayService } from "../services/faspay.service";
import { FaspayClient } from "../faspay/faspay.client";

export class FaspayController {
  constructor(
    private readonly faspayService: FaspayService,
    private readonly faspayClient: FaspayClient
  ) {}

  vaInquiry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(
        "[vaInquiry] Processing faspay virtual account inquiry with request:",
        JSON.stringify({
          method: req.method,
          path: req.originalUrl,
          headers: req.headers,
          body: req.body,
          query: req.query,
          params: req.params
        })
      );

      const payload = req.body;
      const {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId
      } = req.body;
      const signature = req.header("x-signature");
      const timestamp = req.header("x-timestamp");

      const requiredFields = {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId
      };

      const missingFields = Object.entries(requiredFields)
        .filter(
          ([_, value]) => value === undefined || value === null || value === ""
        )
        .map(([key]) => key);

      if (missingFields.length > 0) {
        throw new BadRequestError(
          `Missing required field(s): ${missingFields.join(", ")}`
        );
      }

      if (
        !this.faspayClient.verifyWebhookVirtualAccount({
          payload,
          timestamp: timestamp ?? "",
          signature: signature ?? "",
          vaUrlPath: "/v1.0/transfer-va/inquiry"
        })
      ) {
        throw new ForbiddenError("Signature Invalid");
      }
      const result = await this.faspayService.vaInquiry({
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId
      });

      console.log(
        "[vaInquiry] Processed faspay virtual account inquiry with result:",
        JSON.stringify(result)
      );

      if (result.responseCode.startsWith("404")) {
        return res.status(404).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        return res.status(401).json({
          responseCode: "4014700",
          responseMessage: "Unauthorized. Invalid signature."
        });
      }

      return next(error);
    }
  };

  vaPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(
        "[vaPayment] Processing faspay virtual account payment with request:",
        JSON.stringify({
          method: req.method,
          path: req.originalUrl,
          headers: req.headers,
          body: req.body,
          query: req.query,
          params: req.params
        })
      );

      const payload = req.body;
      const {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        paymentRequestId,
        paidAmount,
        trxDateTime,
        referenceNo
      } = req.body;
      const signature = req.header("x-signature");
      const timestamp = req.header("x-timestamp");

      const requiredFields = {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        paymentRequestId,
        paidAmount,
        trxDateTime,
        referenceNo,
        signature,
        timestamp
      };

      const missingFields = Object.entries(requiredFields)
        .filter(
          ([_, value]) => value === undefined || value === null || value === ""
        )
        .map(([key]) => key);

      if (missingFields.length > 0) {
        throw new BadRequestError(
          `Missing required field(s): ${missingFields.join(", ")}`
        );
      }

      if (
        !this.faspayClient.verifyWebhookVirtualAccount({
          payload,
          timestamp: timestamp ?? "",
          signature: signature ?? "",
          vaUrlPath: "/v1.0/transfer-va/payment"
        })
      ) {
        throw new ForbiddenError("Signature Invalid");
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

      console.log(
        "[vaPayment] Processed faspay virtual account payment with result:",
        JSON.stringify(result)
      );

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        return res.status(401).json({
          responseCode: "4014700",
          responseMessage: "Unauthorized. Invalid signature."
        });
      }

      return next(error);
    }
  };
}
