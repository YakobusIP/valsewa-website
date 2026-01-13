import { memo, useCallback, useState } from "react";

import { bookingService } from "@/services/booking.service";

import { useErrorHandler } from "@/hooks/useErrorHandler";

import { instrumentSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import {
  CheckIcon,
  ChevronLeftIcon,
  DollarSign,
  MoreHorizontal
} from "lucide-react";

type ProgressStepperProps = {
  bookingId: string;
  stepIdx: number;
  onBack: () => void;
};

function ProgressStepper({ bookingId, stepIdx, onBack }: ProgressStepperProps) {
  const { handleAsyncError } = useErrorHandler();
  const [isCancelling, setIsCancelling] = useState(false);

  const isActive = useCallback((idx: number) => idx <= stepIdx, [stepIdx]);

  const handleBack = useCallback(async () => {
    if (isCancelling) return;

    try {
      setIsCancelling(true);
      await bookingService.cancelBooking({ bookingId });
    } catch (error) {
      handleAsyncError(error, "Cancel booking failed", "Cancel booking failed");
    } finally {
      setIsCancelling(false);
      onBack();
    }
  }, [bookingId, isCancelling, handleAsyncError, onBack]);

  return (
    <nav
      className={cn(
        "flex gap-6 text-sm font-bold items-center text-white",
        instrumentSans.className
      )}
      aria-label="Booking progress"
    >
      <button
        onClick={handleBack}
        disabled={isCancelling}
        className="cursor-pointer w-fit rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        aria-label="Go back and cancel booking"
      >
        <div className="flex items-center gap-2 p-4 transition border cursor-pointer border-white/30 rounded-xl hover:border-white bg-white/30">
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </div>
      </button>
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center justify-center ${isActive(0) ? "" : "opacity-50"}`}
          >
            <CheckIcon className="w-8 h-8 p-1 text-black bg-white rounded-full" />
          </div>

          <div className="flex-1 h-px bg-gray-600" />

          <div
            className={`flex items-center justify-center ${isActive(1) ? "" : "opacity-50"}`}
          >
            <MoreHorizontal className="w-8 h-8 p-1 text-black bg-white rounded-full" />
          </div>

          <div className="flex-1 h-px bg-gray-700" />

          <div
            className={`flex items-center justify-center ${isActive(2) ? "" : "opacity-50"}`}
          >
            <DollarSign className="w-8 h-8 p-1 text-black bg-white rounded-full" />
          </div>
        </div>
        <div className="grid items-center grid-cols-3 font-semibold text-white">
          <span className={`text-left ${isActive(0) ? "" : "opacity-50"}`}>
            Choose Booking
          </span>

          <span className={`text-center ${isActive(0) ? "" : "opacity-50"}`}>
            Purchase Details
          </span>

          <span className={`text-right ${isActive(0) ? "" : "opacity-50"}`}>
            Payment
          </span>
        </div>
      </div>
    </nav>
  );
}

export default memo(ProgressStepper);
