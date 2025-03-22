import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertHoursToDays(hours?: number | string | null) {
  if (!hours || typeof hours !== "number") return undefined;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return `${days}d ${remainingHours}h`;
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
