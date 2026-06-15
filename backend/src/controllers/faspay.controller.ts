import { Request, Response, NextFunction } from "express";
import { BadRequestError, ForbiddenError } from "../lib/error";
import { FaspayService } from "../services/faspay.service";
import { FaspayClient } from "../faspay/faspay.client";
import { hashIdentifier, last4 } from "../lib/log-sanitize";

export class FaspayController {
  constructor(
    private readonly faspayService: FaspayService,
    private readonly faspayClient: FaspayClient
  ) {}

  vaInquiry = async (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    try {
      const payload = req.body;
      const {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId
      } = req.body;
      const signature = req.header("x-signature");
      const timestamp = req.header("x-timestamp");

      req.log.info(
        {
          event: "faspay_va_inquiry_received",
          requestId: req.id,
          correlationId: req.correlationId,
          inquiryRequestId,
          hasVirtualAccountNo: Boolean(virtualAccountNo),
          virtualAccountNoLast4: last4(virtualAccountNo),
          customerNoHash: hashIdentifier(customerNo),
          hasSignature: Boolean(signature)
        },
        "Faspay VA inquiry received"
      );

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
        req.log.warn(
          {
            event: "faspay_callback_signature_invalid",
            requestId: req.id,
            correlationId: req.correlationId,
            inquiryRequestId
          },
          "Faspay VA inquiry signature invalid"
        );
        throw new ForbiddenError("Signature Invalid");
      }

      const result = await this.faspayService.vaInquiry({
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId
      });

      req.log.info(
        {
          event: "faspay_va_inquiry_processed",
          requestId: req.id,
          correlationId: req.correlationId,
          inquiryRequestId,
          responseCode: result.responseCode,
          durationMs: Date.now() - start
        },
        "Faspay VA inquiry processed"
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
    const start = Date.now();
    try {
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

      req.log.info(
        {
          event: "faspay_va_payment_received",
          requestId: req.id,
          correlationId: req.correlationId,
          paymentRequestId,
          hasReferenceNo: Boolean(referenceNo),
          referenceNoHash: hashIdentifier(referenceNo),
          hasSignature: Boolean(signature)
        },
        "Faspay VA payment received"
      );

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
        req.log.warn(
          {
            event: "faspay_callback_signature_invalid",
            requestId: req.id,
            correlationId: req.correlationId,
            paymentRequestId,
            referenceNoHash: hashIdentifier(referenceNo)
          },
          "Faspay VA payment signature invalid"
        );
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

      req.log.info(
        {
          event: "faspay_va_payment_processed",
          requestId: req.id,
          correlationId: req.correlationId,
          paymentRequestId,
          referenceNoHash: hashIdentifier(referenceNo),
          responseCode: result.responseCode,
          durationMs: Date.now() - start
        },
        "Faspay VA payment processed"
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
