export const REFRESH_BEFORE_EXPIRY_MS = 60_000;

export type PubAccessTokenPayload = {
  id: number;
  username: string;
  exp?: number;
};

export function decodeJwtPayload<T extends { exp?: number }>(
  token: string
): T | null {
  try {
    const segment = token.split(".")[1];
    if (!segment) return null;

    const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    return JSON.parse(atob(padded)) as T;
  } catch {
    return null;
  }
}

export function decodePubAccessToken(
  token: string
): PubAccessTokenPayload | null {
  const payload = decodeJwtPayload<PubAccessTokenPayload>(token);
  if (!payload?.username || payload.id == null) return null;
  return payload;
}

export function getAccessTokenExpiryMs(token: string): number | null {
  const payload = decodeJwtPayload<{ exp?: number }>(token);
  if (!payload?.exp) return null;
  return payload.exp * 1000;
}

export function shouldRefreshAccessToken(token: string | null): boolean {
  if (!token) return true;

  const expMs = getAccessTokenExpiryMs(token);
  if (expMs === null) return false;

  return expMs - Date.now() <= REFRESH_BEFORE_EXPIRY_MS;
}
