import { parseDurationToHours } from "../../src/lib/utils";

export type ParsedPriceMap = Map<string, number>;

const DURATION_UNIT_BY_DESCRIPTION_UNIT: Record<string, "d" | "h"> = {
  d: "d",
  day: "d",
  days: "d",
  h: "h",
  hour: "h",
  hours: "h"
};

export function baseTierCode(code: string) {
  return code.startsWith("UR-") ? code.slice(3) : code;
}

export function isUnratedTierCode(code: string) {
  return code.startsWith("UR-");
}

function parsePriceValue(rawValue: string, usesThousandsSuffix: boolean) {
  const normalized = usesThousandsSuffix
    ? rawValue.replace(",", ".")
    : rawValue.replace(/[.,]/g, "");

  return Number(normalized);
}

export function parsePriceDescription(description: string): ParsedPriceMap {
  const result: ParsedPriceMap = new Map();

  for (const rawLine of description.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    const match = line.match(
      /^(\d+)\s*(d|day|days|h|hour|hours)\s*=\s*(?:rp\s*)?([\d.,]+)\s*(k)?$/i
    );
    if (!match) {
      throw new Error(`Could not parse price description line: "${line}"`);
    }

    const amount = Number(match[1]);
    const unit = DURATION_UNIT_BY_DESCRIPTION_UNIT[match[2].toLowerCase()];
    const usesThousandsSuffix = !!match[4];
    const rawPrice = parsePriceValue(match[3], usesThousandsSuffix);

    if (!Number.isFinite(amount) || !Number.isFinite(rawPrice)) {
      throw new Error(`Invalid price description line: "${line}"`);
    }

    result.set(
      `${amount}${unit}`,
      Math.round(rawPrice * (usesThousandsSuffix ? 1000 : 1))
    );
  }

  return result;
}

export function durationHours(duration: string) {
  const hours = parseDurationToHours(duration);
  if (!Number.isFinite(hours) || hours <= 0) {
    throw new Error(`Invalid PriceList duration: "${duration}"`);
  }
  return hours;
}

export function assertCompleteLegacyBooking(
  accountId: number,
  label: "current" | "next",
  startAt: Date | null,
  durationHoursValue: number | null,
  endAt: Date | null
) {
  const hasAny = !!startAt || durationHoursValue !== null || !!endAt;
  const hasAll = !!startAt && durationHoursValue !== null && !!endAt;

  if (!hasAny) return false;
  if (!hasAll) {
    throw new Error(
      `Account ${accountId} has incomplete ${label} legacy booking fields.`
    );
  }

  if (!Number.isFinite(durationHoursValue) || durationHoursValue <= 0) {
    throw new Error(
      `Account ${accountId} has invalid ${label} legacy booking duration: ${durationHoursValue}`
    );
  }

  return true;
}
