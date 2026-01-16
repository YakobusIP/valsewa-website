import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRankImageUrl(rank: string): string {
  if (!rank) return "/rank/unranked.webp";
  const r = rank.toLowerCase();

  if (r.includes("iron")) return "/rank/Iron 3.svg";
  if (r.includes("bronze")) return "/rank/Bronze 3.svg";
  if (r.includes("silver")) return "/rank/Silver 3.svg";
  if (r.includes("gold")) return "/rank/Gold 3.svg";
  if (r.includes("platinum")) return "/rank/Platinum 3.svg";
  if (r.includes("diamond")) return "/rank/Diamond 3.svg";
  if (r.includes("ascendant")) return "/rank/Ascendant 3.svg";
  if (r.includes("immortal")) return "/rank/Immortal 3.svg";
  if (r.includes("radiant")) return "/rank/Radiant.svg";

  return "/rank/unranked.webp";
}

export function convertHoursToDays(hours?: number | string | null) {
  if (!hours || typeof hours !== "number") return undefined;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return `${days}d ${remainingHours}h`;
}
