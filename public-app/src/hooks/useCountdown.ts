"use client";

import { useCallback, useEffect, useState } from "react";

export function useCountdown(expiredAtUtc: string | Date | null) {
  const getRemaining = useCallback(() => {
    if (!expiredAtUtc) return 0;

    const expiredTime = new Date(expiredAtUtc).getTime();
    const now = Date.now();

    return Math.max(0, expiredTime - now);
  }, [expiredAtUtc]);

  const [remainingMs, setRemainingMs] = useState<number>(getRemaining);

  useEffect(() => {
    if (!expiredAtUtc) return;

    const interval = setInterval(() => {
      setRemainingMs(getRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiredAtUtc, getRemaining]);

  const hours = Math.floor(remainingMs / 1000 / 3600);
  const minutes = Math.floor(remainingMs / 1000 / 60);
  const seconds = Math.floor((remainingMs / 1000) % 60);

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    isExpired: remainingMs === 0
  };
}
