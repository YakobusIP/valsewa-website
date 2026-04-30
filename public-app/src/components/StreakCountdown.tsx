"use client";

import { useEffect, useState } from "react";

type StreakCountdownProps = {
    lastEligibleRent: Date | string | null;
    onVisibilityChange?: (visible: boolean) => void;
    className?: string;
};

const StreakCountdown = ({
    lastEligibleRent,
    onVisibilityChange,
    className,
}: StreakCountdownProps) => {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        if (!lastEligibleRent) {
            setTime(null);
            onVisibilityChange?.(false);
            return;
        }

        const target =
            typeof lastEligibleRent === "string"
                ? new Date(lastEligibleRent)
                : lastEligibleRent;

        const tick = () => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();

            if (diff <= 0) {
                setTime(null);
                onVisibilityChange?.(false);
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));

            // hide if >= 12 hours
            if (hours >= 12) {
                setTime(null);
                onVisibilityChange?.(false);
                return;
            }

            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTime(
                `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
                    .toString()
                    .padStart(2, "0")}`
            );

            onVisibilityChange?.(true);
        };

        tick();
        const interval = setInterval(tick, 1000);

        return () => clearInterval(interval);
    }, [lastEligibleRent, onVisibilityChange]);

    if (!time) return null;

    return <span className={className}>{time}</span>;
};

export default StreakCountdown;