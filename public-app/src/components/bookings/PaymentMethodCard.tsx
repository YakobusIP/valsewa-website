import { memo } from "react";

import { cn } from "@/lib/utils";

type PaymentMethodCardProps = {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

function PaymentMethodCard({
  active,
  label,
  onClick,
  children,
  className
}: PaymentMethodCardProps) {
  // const isQRIS = label === "QRIS";

  return (
    <button
      onClick={onClick}
      type="button"
      aria-pressed={active}
      aria-label={`Select ${label} payment method`}
      className={cn(
        "group w-full h-full aspect-square rounded-md cursor-pointer border-2 transition-all",
        className,
        active
          ? "border-red-500"
          : "border-white hover:border-red-500"
      )}
    >
      <div
        className={cn(
          "w-full h-full flex items-center justify-center rounded-md transition-all",
          active ? "grayscale-0" : "grayscale group-hover:grayscale-0"
        )}
      >
        {children}
      </div>

      {/* <p
        className={cn(
          "text-center mt-1 sm:mt-2 text-xs sm:text-sm font-semibold transition-colors",
          active ? "text-red-500" : "text-white group-hover:text-red-400"
        )}
      >
        {label}
      </p> */}
    </button>
  );
}

export default memo(PaymentMethodCard);
