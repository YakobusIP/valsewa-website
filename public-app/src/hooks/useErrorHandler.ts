import { useCallback } from "react";

import { handleError } from "@/lib/error-handler";

export function useErrorHandler() {
  const handleAsyncError = useCallback(
    (error: unknown, defaultMessage: string, title?: string) => {
      handleError(error, defaultMessage, title);
    },
    []
  );

  return { handleAsyncError };
}
