"use client";

import { useEffect, useState } from "react";

interface StreakNavbarHoverPanelProps {
  streak: number;
  lastEligibleRent: Date | null;
}

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

const StreakNavbarHoverPanel = ({
  streak,
  lastEligibleRent
}: StreakNavbarHoverPanelProps) => {
  const [countdown, setCountdown] = useState<{
    text: string;
    urgent: boolean;
  } | null>(null);

  useEffect(() => {
    if (!lastEligibleRent || streak === 0) {
      setCountdown(null);
      return;
    }

    const tick = () => {
      const now = new Date();
      const diff = lastEligibleRent.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown(null);
        return;
      }

      const urgent = diff < SIX_HOURS_MS;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const text =
        days > 0
          ? `${days}d ${hours}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
          : `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      setCountdown({ text, urgent });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [lastEligibleRent, streak]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 cursor-default">
        <p className="text-sm font-medium leading-snug cursor-default">
          You&apos;re currently on a <strong>{streak}-day streak</strong> 🔥
        </p>
      </div>

      {streak > 0 && countdown && (
        <div className="cursor-default">
          <div className="text-xs font-medium text-white/70">
            Your streak will end in:
          </div>
          <div
            className={`text-base font-bold tabular-nums mt-0.5 ${
              countdown.urgent ? "text-[#C70515]" : "text-white"
            }`}
          >
            {countdown.text}
          </div>
        </div>
      )}

      {streak === 0 && (
        <div className="text-xs text-white/70 cursor-default">
          Rent today to start your streak!
        </div>
      )}
    </div>
  );
};

export default StreakNavbarHoverPanel;
