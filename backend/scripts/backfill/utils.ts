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
      return `${p.duration} = ${Math.floor(value / 1000)}k`;
    })
    .join("\n");
}

export function lrCode(code: string) {
  return `LR-${code}`;
}

export function collapseBookings(bookings: any[]) {
  const sorted = bookings
    .filter((b) => b.startAt && b.endAt)
    .sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    )
    .slice(0, 2);

  const result: any = {};

  if (sorted[0]) {
    result.currentBookingDate = sorted[0].startAt;
    result.currentBookingDuration = durationToHours(sorted[0].duration);
    result.currentExpireAt = sorted[0].endAt;
  }

  if (sorted[1]) {
    result.nextBookingDate = sorted[1].startAt;
    result.nextBookingDuration = durationToHours(sorted[1].duration);
    result.nextExpireAt = sorted[1].endAt;
  }

  return result;
}
