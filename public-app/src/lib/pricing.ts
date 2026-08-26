import { AccountEntity, PriceList } from "@/types/account.type";

export function parseDurationToHours(duration: string): number {
  const lower = duration.toLowerCase().trim();

  const matches = Array.from(
    lower.matchAll(/(\d+(?:\.\d+)?)\s*(d|day|days|h|hr|hrs|hour|hours)\b/g)
  );

  if (matches.length === 0) return 0;

  return matches.reduce((total, match) => {
    const value = Number(match[1]);
    const unit = match[2];
    return total + (unit.startsWith("d") ? value * 24 : value);
  }, 0);
}

export function formatDurationShort(duration: string): string {
  const lower = duration.toLowerCase().trim();
  const matches = Array.from(
    lower.matchAll(/(\d+(?:\.\d+)?)\s*(d|day|days|h|hr|hrs|hour|hours)\b/g)
  );

  let days = 0;
  let hours = 0;

  for (const match of matches) {
    const value = Number(match[1]);
    const unit = match[2];
    if (unit.startsWith("d")) days += value;
    else hours += value;
  }

  if (days > 0 && hours > 0) return `${days}d${hours}h`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  return duration.trim();
}

function getPriceForEntry(entry: PriceList, isCompetitive: boolean): number {
  return isCompetitive ? entry.compPrice : entry.unratedPrice;
}

export function getLowestTierLabel(account: AccountEntity): string | null {
  const code = account.priceTier?.code;
  const priceList = account.priceTier?.priceList ?? [];
  if (!code || priceList.length === 0) return code ?? null;

  const shortest = [...priceList].sort(
    (a, b) => parseDurationToHours(a.duration) - parseDurationToHours(b.duration)
  )[0];

  const price = getPriceForEntry(shortest, account.isCompetitive);
  const priceK = Math.floor(price / 1000);
  const duration = formatDurationShort(shortest.duration);

  return `${code} - ${priceK}k/${duration}`;
}
