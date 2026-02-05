import { memo, useState } from "react";

import AccountDetailModal from "@/components/dashboard/AccountDetailModal";
import AddBookingModal from "@/components/dashboard/AddBookingModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

import { AccountEntity } from "@/types/account.type";

import { MoreHorizontalIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

type Props = {
  data: AccountEntity;
  resetParent: () => Promise<void>;
};

export default memo(function AccountTableAction({ data, resetParent }: Props) {
  const [openAccountDetail, setOpenAccountDetail] = useState(false);
  const [openAddBookingModal, setOpenAddBookingModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Details</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                setDropdownOpen(false);
                setOpenAccountDetail(true);
              }}
            >
              View account details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setDropdownOpen(false);
                setOpenAddBookingModal(true);
              }}
            >
              Add new booking
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
      {openAddBookingModal && (
        <AddBookingModal
          open={openAddBookingModal}
          onOpenChange={setOpenAddBookingModal}
          data={data}
          resetParent={resetParent}
        />
      )}
    </Fragment>
  );
});
