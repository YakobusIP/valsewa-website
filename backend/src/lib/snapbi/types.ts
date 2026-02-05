export type HttpHeaders = Record<string, string>;
export type PaymentMethod = "qris" | "va" | "";

export interface AccessTokenResponse {
  accessToken?: string;
  [key: string]: unknown;
}

export interface SnapBiRequestBody {
  [key: string]: unknown;
}
