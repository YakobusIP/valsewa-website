import { toast } from "@/hooks/useToast";

import { isAxiosError } from "axios";

export function extractErrorMessage(
  error: unknown,
  defaultMessage: string
): string {
  if (isAxiosError(error)) {
    return error.response?.data?.error || error.message || defaultMessage;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
}

export function handleError(
  error: unknown,
  defaultMessage: string,
  title?: string
): void {
  const message = extractErrorMessage(error, defaultMessage);
  toast({
    variant: "destructive",
    title: title || defaultMessage,
    description: message
  });
}
