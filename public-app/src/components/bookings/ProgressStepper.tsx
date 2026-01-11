import { bookingService } from "@/services/booking.service";

import { toast } from "@/hooks/useToast";

import { isAxiosError } from "axios";
import {
  CheckIcon,
  ChevronLeftIcon,
  DollarSign,
  MoreHorizontal
} from "lucide-react";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

type ProgressStepperProps = {
  bookingId: string;
  stepIdx: number;
  onBack: () => void;
};

export default function ProgressStepper({
  bookingId,
  stepIdx,
  onBack
}: ProgressStepperProps) {
  const isActive = (idx: number) => {
    return idx <= stepIdx;
  };

  const handleBack = async () => {
    try {
      await bookingService.cancelBooking({ bookingId });
    } catch (error) {
      let message = "Cancel booking failed";

      if (isAxiosError(error)) {
        message = error.response?.data?.error || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast({
        variant: "destructive",
        title: "Cancel booking failed",
        description: message
      });
    } finally {
      onBack();
    }
  };

  return (
    <div
      className={`flex gap-6 text-sm font-bold items-center text-white ${instrumentSans.className}`}
    >
      <button onClick={handleBack} className="cursor-pointer w-fit rounded-xl">
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
    </div>
  );
}
