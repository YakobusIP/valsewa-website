import { NextFunction, Request, Response } from "express";
import {
  clientEventSchema,
  sanitizeMetadata
} from "../types/client-event.type";
import { BadRequestError } from "../lib/error";

export class ClientEventController {
  logClientEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = clientEventSchema.safeParse(req.body);
      if (!parsed.success) {
        const message = parsed.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("; ");
        throw new BadRequestError(message);
      }

      const {
        eventName,
        actionId,
        bookingId,
        accountId,
        path,
        confirmDelayMs,
        viewportWidth,
        viewportHeight,
        metadata
      } = parsed.data;

      const sanitizedMetadata = sanitizeMetadata(metadata);

      req.log.info(
        {
          event: "public_client_event",
          clientEventName: eventName,
          customerId: req.customer?.id,
          actionId: actionId ?? null,
          bookingId: bookingId ?? null,
          accountId: accountId ?? null,
          path: path ?? null,
          confirmDelayMs: confirmDelayMs ?? null,
          viewportWidth: viewportWidth ?? null,
          viewportHeight: viewportHeight ?? null,
          userAgent: req.get("user-agent") ?? null,
          metadata: sanitizedMetadata ?? null
        },
        "Public client event"
      );

      return res.status(202).json({ received: true });
    } catch (error) {
      return next(error);
    }
  };
}
