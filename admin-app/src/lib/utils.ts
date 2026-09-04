import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const OPEN_NESTED_OVERLAY_SELECTOR = [
  "[data-radix-select-viewport]",
  "[data-radix-popper-content-wrapper]",
  "[data-radix-menu-content]"
].join(",");

export function hasOpenNestedOverlay() {
  return Boolean(document.querySelector(OPEN_NESTED_OVERLAY_SELECTOR));
}

export function restoreBodyPointerEvents() {
  const sync = () => {
    const openModals = document.querySelectorAll<HTMLElement>(
      '[role="dialog"][data-state="open"], [role="alertdialog"][data-state="open"]'
    );

    if (openModals.length === 0) {
      document.body.style.removeProperty("pointer-events");
      return;
    }

    document.body.style.pointerEvents = "none";
    openModals.forEach((el) => {
      el.style.pointerEvents = "auto";
    });
    document
      .querySelectorAll<HTMLElement>("[data-dialog-overlay][data-state='open']")
      .forEach((el) => {
        el.style.pointerEvents = "auto";
      });
  };

  window.setTimeout(sync, 0);
  requestAnimationFrame(() => {
    requestAnimationFrame(sync);
  });
}

export function convertHoursToDays(hours?: number | string | null) {
  if (!hours || typeof hours !== "number") return undefined;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return `${days}d ${remainingHours}h`;
}

export const parseDurationToHours = (duration: string): number => {
  const lower = duration.toLowerCase().trim();

  const matches = Array.from(
    lower.matchAll(/(\d+(?:\.\d+)?)\s*(d|day|days|h|hr|hrs|hour|hours)\b/g)
  );

  if (matches.length === 0) {
    return 0;
  }

  return matches.reduce((total, match) => {
    const value = Number(match[1]);
    const unit = match[2];
    return total + (unit.startsWith("d") ? value * 24 : value);
  }, 0);
};

export const formatBookingDuration = (
  duration: string,
  quantity = 1
): string => {
  if (!duration || duration === "-") return duration || "-";

  const totalHours = parseDurationToHours(duration) * quantity;
  if (totalHours <= 0) return duration;

  const days = Math.floor(totalHours / 24);
  const remainingHours = totalHours % 24;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (remainingHours > 0) parts.push(`${remainingHours}h`);

  return parts.length > 0 ? parts.join(" ") : duration;
};

export function generateAccountPassword() {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  const getRandomChars = (source: string, length: number) =>
    Array.from(
      { length },
      () => source[Math.floor(Math.random() * source.length)]
    ).join("");

  return getRandomChars(lowercase, 4) + getRandomChars(numbers, 4);
}

export function generatePassword() {
  const lowercase = "abcdefghijkmnpqrstuvwxyz";
  const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numbers = "123456789";
  const specialChars = "!@#$%^&*()_+{}[]<>?/";

  const getRandomChars = (source: string, length: number) =>
    Array.from(
      { length },
      () => source[Math.floor(Math.random() * source.length)]
    ).join("");

  return (
    getRandomChars(lowercase, 4) +
    getRandomChars(uppercase, 2) +
    getRandomChars(numbers, 4) +
    getRandomChars(specialChars, 2)
  );
}
