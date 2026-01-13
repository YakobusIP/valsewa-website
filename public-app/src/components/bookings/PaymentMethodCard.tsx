import { memo } from "react";

import { cn } from "@/lib/utils";

type PaymentMethodCardProps = {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
};

function PaymentMethodCard({
  active,
  label,
  onClick,
  children
}: PaymentMethodCardProps) {
  const isQRIS = label === "QRIS";

  return (
    <button
      onClick={onClick}
      type="button"
      aria-pressed={active}
      aria-label={`Select ${label} payment method`}
      className={cn(
        "group w-fit rounded-md cursor-pointer border-2 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black",
        active
          ? "bg-white border-red-500"
          : "border-white hover:border-red-500",
        isQRIS ? "p-8" : "p-4 hover:bg-white"
      )}
    >
      <div
        className={cn(
          "w-full flex items-center justify-center rounded-md transition-all",
          active ? "grayscale-0" : "grayscale group-hover:grayscale-0"
        )}
      >
        {children}
      </div>

      <p
        className={cn(
          "text-center mt-2 font-semibold transition-colors",
          active ? "text-red-500" : "text-white group-hover:text-red-400"
        )}
      >
        {label}
      </p>
    </button>
  );
}

export default memo(PaymentMethodCard);
