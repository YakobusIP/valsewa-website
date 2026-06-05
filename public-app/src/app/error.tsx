"use client";

import { useEffect } from "react";

import { logClientEvent, getLastKnownActionId } from "@/lib/client-event-logger";

import { useAuth } from "@/hooks/useAuth";

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "…[truncated]";
}

export default function Error({
  error
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    void logClientEvent({
      eventName: "client_error_boundary_triggered",
      actionId: getLastKnownActionId() ?? undefined,
      metadata: {
        errorName: truncate(error.name || "Unknown", 128),
        errorMessage: truncate(error.message || "No message", 512),
        componentStack: error.digest
          ? truncate(error.digest, 256)
          : undefined
      }
    });
  }, [error, isAuthenticated]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#0F0F0F]">
      <div className="text-center px-4">
        <h1 className="text-2xl font-bold text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-400 mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-md bg-[#C70515] px-6 py-3 text-white font-semibold hover:bg-[#a90412] transition focus:outline-none focus:ring-2 focus:ring-[#C70515] focus:ring-offset-2 focus:ring-offset-[#0F0F0F]"
        >
          Reload page
        </button>
      </div>
    </div>
  );
}