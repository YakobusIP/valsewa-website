import { Booking, PaymentChannelType, PaymentStatus } from "@prisma/client";

export interface PaymentGatewaySession {
  providerTransactionId: string;
  paymentRedirectUrl: string;
  channelCode?: string;
}

export interface PaymentWebhookResult {
  providerId: string;
  status: PaymentStatus;
  failureReason?: string;
  metadata?: any;
}

// --- Interface for Decoupling from Faspay ---
export interface PaymentGatewayAdapter {
  createSession(
    booking: Booking,
    paymentId: string,
    channel: PaymentChannelType
  ): Promise<PaymentGatewaySession>;

  verifyWebhook(payload: any, signature: string): boolean;

  processWebhook(payload: any): PaymentWebhookResult;
}

export class FasPayAdapter implements PaymentGatewayAdapter {
  private readonly GATEWAY_NAME = "FasPay";

  getGatewayName(): string {
    return this.GATEWAY_NAME;
  }

  async createSession(
    booking: Booking,
    paymentId: string,
    channel: PaymentChannelType
  ): Promise<PaymentGatewaySession> {
    // TODO:
    // 1. Logic to transform internal data into FasPay request format
    // 2. HTTP POST call to FasPay payment initiation endpoint (e.g., using axios)

    // MOCK RESPONSE
    console.log(
      `[FasPay] Creating session for Booking ${booking.id} via ${channel}`
    );
    return {
      providerTransactionId: `FP-${Math.random().toString(36).substring(2, 15)}`,
      paymentRedirectUrl: `https://faspay.com/pay/${paymentId}` // Redirect user here
    };
  }

  verifyWebhook(payload: any, signature: string): boolean {
    // TODO:
    // 1. CRITICAL: Calculate expected signature hash using SECRET_KEY and payload/headers.
    // 2. Compare calculated hash with the signature header.

    // MOCK: Always return true for dev environment
    return true;
  }

  processWebhook(payload: any): PaymentWebhookResult {
    // TODO:
    // 1. Logic to extract FasPay's status code, transaction ID, and reason.

    // MOCK: Simulate success/failure based on a key in the payload
    const isSuccess = payload.payment_status === "SUCCESS";

    return {
      providerId: payload.merchant_tranid || "MOCK_PROVIDER_ID",
      status: isSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED,
      failureReason: isSuccess ? undefined : payload.payment_message,
      metadata: payload // Store the raw payload for audit
    };
  }
}
