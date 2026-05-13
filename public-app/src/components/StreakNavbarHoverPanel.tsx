"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

interface StreakNavbarHoverPanelProps {
  streak: number;
  lastEligibleRent: Date | null;
}

const StreakNavbarHoverPanel = ({
  streak,
  lastEligibleRent
}: StreakNavbarHoverPanelProps) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    if (!lastEligibleRent || streak === 0) {
      setTimeLeft(null);
      return;
    }

    const tick = () => {
      const now = new Date();
      const diff = lastEligibleRent.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(
          `${days}d ${hours}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
        );
      } else {
        setTimeLeft(
          `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
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
        <div>
          <span className="font-semibold text-xl [text-shadow:_-2px_0_0_#bd0c00,_2px_0_0_#bd0c00,_0_-2px_0_#bd0c00,_0_2px_0_#bd0c00]">
            {streak}
          </span>
          <span className="text-sm font-medium ml-1.5">day streak</span>
        </div>
      </div>

      {streak > 0 && timeLeft && (
        <div className="cursor-default">
          <div className="text-xs font-medium text-white/70">
            Streak expires in
          </div>
          <div className="text-base font-bold tabular-nums mt-0.5">
            {timeLeft}
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
