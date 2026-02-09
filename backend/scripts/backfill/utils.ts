export function durationToHours(duration: string): number {
  const value = parseInt(duration, 10);

  if (duration.endsWith("d")) return value * 24;
  if (duration.endsWith("h")) return value;

  throw new Error(`Unknown duration format: ${duration}`);
}

export type SourcePriceListRow = {
  duration: string;
  normalPrice: number;
  lowPrice: number | null;
};

type PriceMode = "NORMAL" | "LOW";

export function buildPriceTierDescription(
  priceLists: SourcePriceListRow[],
  mode: PriceMode
) {
  return priceLists
    .map((p) => {
      const value = mode === "NORMAL" ? p.normalPrice : (p.lowPrice ?? 0);

      const match = p.duration.match(/^(\d+)([a-zA-Z]+)$/);
      if (!match) {
        throw new Error(`Invalid duration format: ${p.duration}`);
      }

      const [, amount, unit] = match;

      return `${amount} ${unit} = ${Math.floor(value / 1000)}k`;
    })
    .join("\n");
}

export function lrCode(code: string) {
  return `LR-${code}`;
}

type BookingRow = {
  status: string;
  duration: string;
  startAt: Date | string | null;
  endAt: Date | string | null;
};

const ALLOWED_STATUSES = new Set(["RESERVED"]); // adjust if needed

export function collapseBookings(bookings: BookingRow[], now = new Date()) {
  const eligible = bookings
    .filter((b) => {
      if (!b.startAt || !b.endAt) return false;
      if (!ALLOWED_STATUSES.has(b.status)) return false;

      const end = new Date(b.endAt);
      return end.getTime() > now.getTime(); // must still be active/future
    })
    .sort(
      (a, b) =>
        new Date(a.startAt as any).getTime() -
        new Date(b.startAt as any).getTime()
    )
    .slice(0, 2);

  const result: {
    currentBookingDate?: Date;
    currentBookingDuration?: number;
    currentExpireAt?: Date;
    nextBookingDate?: Date;
    nextBookingDuration?: number;
    nextExpireAt?: Date;
  } = {};

  if (eligible[0]) {
    result.currentBookingDate = new Date(eligible[0].startAt as any);
    result.currentBookingDuration = durationToHours(eligible[0].duration);
    result.currentExpireAt = new Date(eligible[0].endAt as any);
  }

  if (eligible[1]) {
    result.nextBookingDate = new Date(eligible[1].startAt as any);
    result.nextBookingDuration = durationToHours(eligible[1].duration);
    result.nextExpireAt = new Date(eligible[1].endAt as any);
  }

  return result;
}
