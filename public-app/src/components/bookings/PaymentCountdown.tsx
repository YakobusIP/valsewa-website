import { useCountdown } from "@/hooks/useCountdown";

import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

type PaymentCountdownProps = {
  expiredAt: Date;
};

export default function PaymentCountdown({ expiredAt }: PaymentCountdownProps) {
  const { hours, minutes, seconds, isExpired } = useCountdown(expiredAt);

  return (
    <div className="w-full py-6 mt-8 bg-red-500/20">
      <p
        className={`text-sm text-center ${instrumentSans.className} ${isExpired ? "text-red-500" : "text-white"}`}
      >
        {isExpired ? (
          "Payment expired"
        ) : (
          <>
            Please secure your booking within{" "}
            <span className="font-bold">
              {hours}:{minutes}:{seconds}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
