import crypto from "crypto";
import SnapBiApiRequestor from "./snapbi.api-requestor";
import SnapBiConfig from "./snapbi.config";
import {
  HttpHeaders,
  PaymentMethod,
  SnapBiRequestBody,
  AccessTokenResponse
} from "./types";

export default class SnapBi {
  /* ==========================
   * API CONSTANTS
   * ========================== */
  private static readonly ACCESS_TOKEN = "/v1.0/access-token/b2b";
  private static readonly QRIS_PAYMENT = "/v1.0/qr/qr-mpm-generate";
  private static readonly QRIS_STATUS = "/v1.0/qr/qr-mpm-query";
  private static readonly QRIS_REFUND = "/v1.0/qr/qr-mpm-refund";
  private static readonly QRIS_CANCEL = "/v1.0/qr/qr-mpm-cancel";

  private apiPath = "";
  private accessTokenHeader: HttpHeaders = {};
  private transactionHeader: HttpHeaders = {};
  private body: SnapBiRequestBody = {};
  private accessToken = "";
  private deviceId = "";
  private debugId = "";
  private timeStamp = new Date().toISOString();
  private timeout?: number;
  private signature = "";
  private notificationUrlPath = "";
  private notificationPayload: Record<string, unknown> = {};

  private constructor(private readonly paymentMethod: PaymentMethod) {}

  /* ==========================
   * FACTORY METHODS
   * ========================== */
  static qris(): SnapBi {
    return new SnapBi("qris");
  }

  static notification(): SnapBi {
    return new SnapBi("");
  }

  /* ==========================
   * CLIENT CONFIGS
   * ========================== */
  withAccessTokenHeader(headers: HttpHeaders): this {
    this.accessTokenHeader = { ...this.accessTokenHeader, ...headers };
    return this;
  }

  withTransactionHeader(headers: HttpHeaders): this {
    this.transactionHeader = { ...this.transactionHeader, ...headers };
    return this;
  }

  withAccessToken(token: string): this {
    this.accessToken = token;
    return this;
  }

  withBody(body: SnapBiRequestBody): this {
    this.body = body;
    return this;
  }

  withSignature(signature: string): this {
    this.signature = signature;
    return this;
  }

  withTimeStamp(timeStamp: string): this {
    this.timeStamp = timeStamp;
    return this;
  }

  withNotificationPayload(payload: Record<string, unknown>): this {
    this.notificationPayload = payload;
    return this;
  }

  withNotificationUrlPath(path: string): this {
    this.notificationUrlPath = path;
    return this;
  }

  withDeviceId(deviceId: string): this {
    this.deviceId = deviceId;
    return this;
  }

  withDebugId(debugId: string): this {
    this.debugId = debugId;
    return this;
  }

  withTimeout(timeoutMs: number): this {
    this.timeout = timeoutMs;
    return this;
  }

  /* ==========================
   * PATH RESOLUTION
   * ========================== */
  private getCreatePaymentPath(): string {
    switch (this.paymentMethod) {
      case "qris":
        return SnapBi.QRIS_PAYMENT;
      default:
        throw new Error("Unsupported payment method");
    }
  }

  private getRefundPath(): string {
    if (this.paymentMethod === "qris") return SnapBi.QRIS_REFUND;
    throw new Error("Refund not supported");
  }

  private getCancelPath(): string {
    if (this.paymentMethod === "qris") return SnapBi.QRIS_CANCEL;
    throw new Error("Cancel not supported");
  }

  private getStatusPath(): string {
    if (this.paymentMethod === "qris") return SnapBi.QRIS_STATUS;
    throw new Error("Status not supported");
  }

  /* ==========================
   * HEADER BUILDERS
   * ========================== */
  private buildTransactionHeader(externalId?: string): HttpHeaders {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${this.accessToken}`,
      "X-PARTNER-ID": SnapBiConfig.snapBiPartnerId,
      "X-EXTERNAL-ID": externalId ?? "",
      "X-DEVICE-ID": this.deviceId,
      "CHANNEL-ID": SnapBiConfig.snapBiChannelId,
      "X-TIMESTAMP": this.timeStamp,
      "debug-id": this.debugId,
      "X-SIGNATURE": SnapBi.getHmacSignature(
        this.accessToken,
        this.body,
        "post",
        this.apiPath,
        SnapBiConfig.snapBiClientSecret,
        this.timeStamp
      ),
      ...this.transactionHeader
    };
  }

  private buildAccessTokenHeader(): HttpHeaders {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CLIENT-KEY": SnapBiConfig.snapBiClientId,
      "X-TIMESTAMP": this.timeStamp,
      "debug-id": this.debugId,
      "X-SIGNATURE": SnapBi.getRsaSignature(
        SnapBiConfig.snapBiClientId,
        this.timeStamp,
        SnapBiConfig.snapBiPrivateKey
      ),
      ...this.accessTokenHeader
    };
  }

  /* ==========================
   * SIGNATURE HELPERS
   * ========================== */
  private static getHmacSignature(
    accessToken: string,
    body: unknown,
    method: string,
    path: string,
    secret: string,
    timeStamp: string
  ): string {
    const hashedBody = crypto
      .createHash("sha256")
      .update(JSON.stringify(body))
      .digest("hex")
      .toLowerCase();

    const payload = `${method.toUpperCase()}:${path}:${accessToken}:${hashedBody}:${timeStamp}`;

    return crypto.createHmac("sha512", secret).update(payload).digest("base64");
  }

  private static getRsaSignature(
    clientId: string,
    timeStamp: string,
    privateKey: string
  ): string {
    return crypto
      .sign("RSA-SHA256", Buffer.from(`${clientId}|${timeStamp}`), privateKey)
      .toString("base64");
  }

  /* ==========================
   * INTERNAL FLOW
   * ========================== */
  private async getAccessToken(): Promise<AccessTokenResponse> {
    return SnapBiApiRequestor.remoteCall(
      SnapBiConfig.getBaseUrl() + SnapBi.ACCESS_TOKEN,
      this.buildAccessTokenHeader(),
      { grant_type: "client_credentials" },
      this.timeout
    );
  }

  private async createConnection(externalId?: string) {
    if (!this.accessToken) {
      const tokenResponse = await this.getAccessToken();
      if (!tokenResponse.accessToken) return tokenResponse;
      this.accessToken = tokenResponse.accessToken;
    }

    return SnapBiApiRequestor.remoteCall(
      SnapBiConfig.getBaseUrl() + this.apiPath,
      this.buildTransactionHeader(externalId),
      this.body,
      this.timeout
    );
  }

  /* ==========================
   * PUBLIC API METHODS
   * ========================== */
  async createPayment(externalId: string) {
    this.apiPath = this.getCreatePaymentPath();
    return this.createConnection(externalId);
  }

  async cancel(externalId: string) {
    this.apiPath = this.getCancelPath();
    return this.createConnection(externalId);
  }

  async refund(externalId: string) {
    this.apiPath = this.getRefundPath();
    return this.createConnection(externalId);
  }

  async getStatus(externalId: string) {
    this.apiPath = this.getStatusPath();
    return this.createConnection(externalId);
  }

  /* ==========================
   * WEBHOOK VERIFICATION
   * ========================== */
  isWebhookNotificationVerified(): boolean {
    if (!SnapBiConfig.snapBiPublicKey) {
      throw new Error("SnapBi public key is not configured");
    }

    const hashedBody = crypto
      .createHash("sha256")
      .update(JSON.stringify(this.notificationPayload))
      .digest("hex")
      .toLowerCase();

    const payload = `POST:${this.notificationUrlPath}:${hashedBody}:${this.timeStamp}`;

    const verifier = crypto.createVerify("SHA256");
    verifier.update(payload);

    return verifier.verify(
      SnapBiConfig.snapBiPublicKey,
      this.signature,
      "base64"
    );
  }
}
