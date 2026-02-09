import { memo, useCallback, useState } from "react";

import { accountService } from "@/services/account.service";

import AccountCurrentBookModal from "@/components/dashboard/AccountCurrentBookModal";
import AccountDetailModal from "@/components/dashboard/AccountDetailModal";
import AccountNextBookModal from "@/components/dashboard/AccountNextBookModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

import { toast } from "@/hooks/useToast";

import { AccountEntity, AccountEntityRequest } from "@/types/account.type";

import { MoreHorizontalIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

type Props = {
  data: AccountEntity;
  resetParent: () => Promise<void>;
};

export default memo(function AccountTableAction({ data, resetParent }: Props) {
  const [openAccountDetail, setOpenAccountDetail] = useState(false);
  const [openCurrentBookingModal, setOpenCurrentBookingModal] = useState(false);
  const [openNextBookingModal, setOpenNextBookingModal] = useState(false);

  const currentBookingExist =
    !!data.currentBookingDate &&
    !!data.currentBookingDuration &&
    !!data.currentExpireAt;

  const nextBookingExist =
    !!data.nextBookingDate && !!data.nextBookingDuration && !!data.nextExpireAt;

  const finishCurrentBooking = useCallback(async () => {
    if (currentBookingExist) {
      try {
        const response = await accountService.finishBooking(data.id);
        await resetParent();

        toast({
          title: "All set!",
          description: response.message
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occured";

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: errorMessage
        });
      }
    }
  }, [currentBookingExist, data.id, resetParent]);

  const moveNextBookingToCurrent = useCallback(async () => {
    if (nextBookingExist) {
      const payload: Partial<AccountEntityRequest> = {
        currentBookingDate: data.nextBookingDate,
        currentBookingDuration: data.nextBookingDuration,
        currentExpireAt: data.nextExpireAt,
        nextBookingDate: null,
        nextBookingDuration: null,
        nextExpireAt: null
      };
      try {
        const response = await accountService.update(data.id, payload);
        await resetParent();

        toast({
          title: "All set!",
          description: response.message
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occured";

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: errorMessage
        });
      }
    }
  }, [
    data.id,
    data.nextBookingDate,
    data.nextBookingDuration,
    data.nextExpireAt,
    nextBookingExist,
    resetParent
  ]);

  return (
    <Fragment>
      <div className="relative">
        {data.passwordResetRequired && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="absolute right-0 animate-pulse w-2 h-2 bg-destructive rounded-full" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Password needs to be updated</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Details</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setOpenAccountDetail(true)}>
              View account details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenCurrentBookingModal(true)}>
              View current booking
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenNextBookingModal(true)}>
              View next booking
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Booking Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={finishCurrentBooking}
              disabled={!currentBookingExist}
            >
              Finish current booking
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={moveNextBookingToCurrent}
              disabled={!nextBookingExist}
            >
              Move next booking to current
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {openAccountDetail && (
        <AccountDetailModal
          open={openAccountDetail}
          onOpenChange={setOpenAccountDetail}
          mode="edit"
          data={data}
          resetParent={resetParent}
        />
      )}
      {openCurrentBookingModal && (
        <AccountCurrentBookModal
          open={openCurrentBookingModal}
          onOpenChange={setOpenCurrentBookingModal}
          data={data}
          resetParent={resetParent}
        />
      )}
      {openNextBookingModal && (
        <AccountNextBookModal
          open={openNextBookingModal}
          onOpenChange={setOpenNextBookingModal}
          data={data}
          resetParent={resetParent}
        />
      )}
    </Fragment>
  );
});
