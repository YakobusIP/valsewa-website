"use client";

import { useEffect, useState } from "react";

type CountdownTimerProps = {
  targetDate: string;
};

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const end = Date.parse(targetDate);

    if (Number.isNaN(end)) {
      console.error("Invalid date:", targetDate);
      return;
    }

    const tick = () => {
      const diff = end - Date.now();

      if (diff <= 0) {
        setTimeLeft("0D:0H:0M");
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);

      // ❌ no padStart
      // ✅ uppercase + dynamic digits
      setTimeLeft(`${d}D:${h}H:${m}M`);
    };

    tick();
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [targetDate]);

  return <span className="font-semibold">{timeLeft}</span>;
};

export default CountdownTimer;