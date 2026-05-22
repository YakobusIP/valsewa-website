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
      className="w-full py-6 mt-8 bg-[#C70515]/40 border border-[#C70515]"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p
        className={`text-base text-center ${instrumentSans.className} ${isExpired ? "text-red-500" : "text-white"}`}
      >
        {isExpired ? (
          "Payment expired"
        ) : (
          <>
            Please secure your booking within{" "}
            <div
              className="font-bold text-xl"
              aria-label={`${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`}
            >
              {hours}:{minutes}:{seconds}
            </div>
          </>
        )}
      </p>
    </div>
  );
}

export default memo(PaymentCountdown);
