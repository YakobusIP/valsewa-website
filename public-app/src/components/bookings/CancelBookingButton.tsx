import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Loader2Icon } from "lucide-react";

type Props = {
  cancelBooking: () => Promise<void>;
  isLoadingCancelBooking: boolean;
};

export default function CancelBookingButton({
  cancelBooking,
  isLoadingCancelBooking
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex group items-center justify-center gap-3 px-5 py-2 lg:py-8 bg-neutral-300/60  backdrop-blur-sm border border-white/20 rounded-lg">
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path d="M0 6L9.75 11.6292L9.75 0.370835L0 6Z" fill="white" />
          </svg>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black border border-red-500">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-white uppercase mb-4">
            Confirm Cancellation
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            Your reserved item will be released and available for others
            immediately upon cancellation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white bg-black">
            Keep Reservation
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            onClick={cancelBooking}
          >
            {isLoadingCancelBooking && (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            )}
            Cancel Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
