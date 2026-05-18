"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

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

      const pad = (n: number) => n.toString().padStart(2, "0");
      const text =
        days > 0
          ? `${days}_${pad(hours)}_${pad(minutes)}`
          : `${pad(hours)}_${pad(minutes)}_${pad(seconds)}`;

      setCountdown({ text, urgent });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [lastEligibleRent, streak]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 cursor-default">
        <Image
          src="/header/streak icon.svg"
          alt="streak"
          width={32}
          height={32}
        />
        <p className="text-sm font-medium leading-snug cursor-default">
          You&apos;re currently on a{" "}
          <span className="font-semibold text-xl [text-shadow:_-2px_0_0_#bd0c00,_2px_0_0_#bd0c00,_0_-2px_0_#bd0c00,_0_2px_0_#bd0c00]">
            {streak}
          </span>
          -day streak 🔥
        </p>
      </div>

      {streak > 0 && countdown && (
        <div className="cursor-default">
          <div className="text-xs font-medium text-white/70">
            Your streak will end in:{" "}
            <span
              className={`text-base font-bold tabular-nums mt-0.5 inline ${
                countdown.urgent ? "text-[#C70515]" : "text-white"
              }`}
            >
              {countdown.text}
            </span>
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
