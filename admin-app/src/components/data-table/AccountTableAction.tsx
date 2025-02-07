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
