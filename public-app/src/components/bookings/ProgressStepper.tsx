import { memo, useCallback } from "react";

import { instrumentSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import {
  CheckIcon,
  DollarSign,
  MoreHorizontal
} from "lucide-react";
import CancelBookingButton from "./CancelBookingButton";

type ProgressStepperProps = {
  stepIdx: number;
  handleCancelBooking: () => Promise<void>;
  isLoadingCancelBooking: boolean;
};

function ProgressStepper({ stepIdx, handleCancelBooking, isLoadingCancelBooking }: ProgressStepperProps) {
  const isActive = useCallback((idx: number) => idx <= stepIdx, [stepIdx]);

  return (
    <nav
      className={cn(
        "flex gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm font-bold items-center text-white",
        instrumentSans.className
      )}
      aria-label="Booking progress"
    >
      <div className="hidden lg:flex">
        <CancelBookingButton cancelBooking={handleCancelBooking} isLoadingCancelBooking={isLoadingCancelBooking} />
      </div>

      <div className="flex flex-col w-full gap-1 sm:gap-2">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div
            className={`flex items-center justify-center ${isActive(0) ? "" : "opacity-50"}`}
          >
            <CheckIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 p-0.5 sm:p-1 text-black bg-white rounded-full" />
          </div>

          <div className="flex-1 h-px bg-gray-600" />

          <div
            className={`flex items-center justify-center ${isActive(1) ? "" : "opacity-50"}`}
          >
            <MoreHorizontal className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 p-0.5 sm:p-1 text-black bg-white rounded-full" />
          </div>

          <div className="flex-1 h-px bg-gray-700" />

          <div
            className={`flex items-center justify-center ${isActive(2) ? "" : "opacity-50"}`}
          >
            <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 p-0.5 sm:p-1 text-black bg-white rounded-full" />
          </div>
        </div>
        <div className="grid items-center grid-cols-3 font-semibold text-white text-[10px] sm:text-xs lg:text-sm">
          <span
            className={`text-left break-words ${isActive(0) ? "" : "opacity-50"}`}
          >
            Choose Booking
          </span>

          <span
            className={`text-center break-words ${isActive(0) ? "" : "opacity-50"}`}
          >
            Purchase Details
          </span>

          <span
            className={`text-right break-words ${isActive(0) ? "" : "opacity-50"}`}
          >
            Payment
          </span>
        </div>
      </div>
    </nav>
  );
}

export default memo(ProgressStepper);
