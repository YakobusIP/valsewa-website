import { memo } from "react";

import { useCountdown } from "@/hooks/useCountdown";

import { instrumentSans } from "@/lib/fonts";

type PaymentCountdownProps = {
  expiredAt: Date;
};

function PaymentCountdown({ expiredAt }: PaymentCountdownProps) {
  const { hours, minutes, seconds, isExpired } = useCountdown(expiredAt);

  return (
    <div
      className="w-full py-6 mt-8 bg-red-500/20"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p
        className={`text-sm text-center ${instrumentSans.className} ${isExpired ? "text-red-500" : "text-white"}`}
      >
        {isExpired ? (
          "Payment expired"
        ) : (
          <>
            Please secure your booking within{" "}
            <span
              className="font-bold"
              aria-label={`${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`}
            >
              {hours}:{minutes}:{seconds}
            </span>
          </>
        )}
      </p>
    </div>
  );
}

export default memo(PaymentCountdown);
