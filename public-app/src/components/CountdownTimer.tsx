import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const countDownDate = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setIsExpired(true);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      // const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        // `${String(days).padStart(2, "0")}d:${String(hours).padStart(2, "0")}h:${String(minutes).padStart(2, "0")}m:${String(seconds).padStart(2, "0")}`
        `${String(days).padStart(2, "0")}d:${String(hours).padStart(2, "0")}h:${String(minutes).padStart(2, "0")}m`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (isExpired) return null;

  return <span className="text-sm font-semibold ">{timeLeft}</span>;
};

export default CountdownTimer;
