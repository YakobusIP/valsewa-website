import { useState } from "react";

import AccountDetailModal from "@/components/dashboard/AccountDetailModal";
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

export default function AccountTableAction({ data, resetParent }: Props) {
  const [openAccountDetail, setOpenAccountDetail] = useState(false);

  return (
    <Fragment>
      <div className="relative">
        {data.stale_password && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="absolute right-6 animate-pulse w-2 h-2 bg-destructive rounded-full" />
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setOpenAccountDetail(true)}>
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AccountDetailModal
        open={openAccountDetail}
        onOpenChange={setOpenAccountDetail}
        mode="edit"
        data={data}
        resetParent={resetParent}
      />
    </Fragment>
  );
}
