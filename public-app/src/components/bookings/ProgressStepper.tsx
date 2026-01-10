import { Instrument_Sans } from "next/font/google";
import { CheckIcon, DollarSign, MoreHorizontal } from "lucide-react";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
})

type ProgressStepperProps = {
  stepIdx: number;
}

export default function ProgressStepper({ stepIdx }: ProgressStepperProps) {
  function isActive(idx: number) {
    return idx <=stepIdx 
  }
  
  return (
    <div className={`flex flex-col gap-2 text-sm font-bold text-white ${instrumentSans.className}`}>
      <div className="flex items-center gap-4">
        <div className={`flex items-center justify-center ${isActive(0) ? "" : "opacity-50"}`}>
          <CheckIcon className="w-8 h-8 p-1 text-black bg-white rounded-full" />
        </div>

        <div className="flex-1 h-px bg-gray-600" />

        <div className={`flex items-center justify-center ${isActive(1) ? "" : "opacity-50"}`}>
          <MoreHorizontal className="w-8 h-8 p-1 text-black bg-white rounded-full" />
        </div>

        <div className="flex-1 h-px bg-gray-700" />

        <div className={`flex items-center justify-center ${isActive(2) ? "" : "opacity-50"}`}>
          <DollarSign className="w-8 h-8 p-1 text-black bg-white rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-3 items-center text-white font-semibold">
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
  );
}
