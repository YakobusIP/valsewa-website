import { env } from "../env";

export interface SnapBiConfigOptions {
  isProduction: boolean;
  enableLogging: boolean;
  merchantId: string;
  clientId: string;
  privateKey: string;
  clientSecret: string;
  partnerId: string;
  channelId: string;
  publicKey: string;
}

export default class SnapBiConfig {
  static isProduction: boolean;
  static enableLogging: boolean;
  static snapBiMerchantId: string;
  static snapBiClientId: string;
  static snapBiClientSecret: string;
  static snapBiPartnerId: string;
  static snapBiChannelId: string;
  static snapBiPublicKey: string; // provider public key
  static snapBiPrivateKey: string; // valsewa private key

  private static readonly SNAP_BI_SANDBOX_BASE_URL =
    "https://debit-sandbox.faspay.co.id";

  private static readonly SNAP_BI_PRODUCTION_BASE_URL =
    "https://debit.faspay.co.id";

  static getBaseUrl(): string {
    return this.isProduction
      ? this.SNAP_BI_PRODUCTION_BASE_URL
      : this.SNAP_BI_SANDBOX_BASE_URL;
  }

  static init(): void {
    this.snapBiClientId = env.SNAP_BI_MERCHANT_ID || "snap_bi_merchant_id";

    this.snapBiClientId = env.SNAP_BI_CLIENT_ID  || "snap_bi_client_id";
    
    this.snapBiClientSecret = env.SNAP_BI_CLIENT_SECRET || "snap_bi_client_secret";
    
    this.snapBiPartnerId = env.SNAP_BI_PARTNER_ID || "snap_bi_partner_id";
    
    this.snapBiChannelId = env.SNAP_BI_CHANNEL_ID || "snap_bi_channel_id";
    
    this.snapBiPublicKey = env.SNAP_BI_PUBLIC_KEY || "snap_bi_public_key";

    this.snapBiPrivateKey = env.SNAP_BI_PRIVATE_KEY  || "snap_bi_private_key";

    this.isProduction = env.NODE_ENV === "production";

    this.enableLogging = false;
  }

  /* ==========================
   * VALIDATION
   * ========================== */
  private static validate(): void {
    const required = [
      ["SNAP_BI_CLIENT_ID", this.snapBiClientId],
      ["SNAP_BI_PRIVATE_KEY", this.snapBiPrivateKey],
      ["SNAP_BI_CLIENT_SECRET", this.snapBiClientSecret],
      ["SNAP_BI_PARTNER_ID", this.snapBiPartnerId],
      ["SNAP_BI_CHANNEL_ID", this.snapBiChannelId]
    ];

    const missing = required.filter(([, v]) => !v);

    if (missing.length > 0) {
      throw new Error(
        `[SnapBiConfig] Missing required values: ${missing
          .map(([k]) => k)
          .join(", ")}`
      );
    }
  }
}
