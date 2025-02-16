import { accountService } from "@/services/account.service";

import AccountTableAction from "@/components/data-table/AccountTableAction";
import AvailabilityStatus from "@/components/data-table/AvailabilityStatus";
import { Checkbox } from "@/components/ui/checkbox";

import { AccountEntity } from "@/types/account.type";

import { ranks } from "@/lib/constants";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const accountColumns = (
  resetParent: () => Promise<void>
): ColumnDef<AccountEntity>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      size: "auto" as unknown as number,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: "accountCode",
      header: "Code",
      size: "auto" as unknown as number
    },
    {
      accessorKey: "username",
      header: "Username",
      size: "auto" as unknown as number
    },
    {
      accessorKey: "accountRank",
      accessorFn: ({ accountRank }) => {
        const rank = ranks.find((rank) => rank.value === accountRank);
        return rank ? rank.label : "-";
      },
      header: "Rank",
      size: "auto" as unknown as number
    },
    {
      accessorKey: "progressStatus",
      header: "Availability Status",
      cell: ({ row }) => {
        const account = row.original;
        return (
          <AvailabilityStatus
            id={account.id}
            availabilityStatus={account.availabilityStatus}
            serviceFn={accountService.update}
            resetParent={resetParent}
          />
        );
      },
      size: "auto" as unknown as number
    },
    {
      accessorKey: "expireAt",
      header: "Expire At",
      cell: ({ getValue }) => {
        const date = getValue<Date>();
        if (date === null) {
          return "-";
        }
        return format(date, "dd MMMM yyyy 'at' HH:mm");
      },
      size: "auto" as unknown as number
    },
    {
      accessorKey: "nextBooking",
      header: "Next Booking",
      cell: ({ getValue }) => {
        const date = getValue<Date>();
        if (date === null) {
          return "-";
        }
        return format(date, "dd MMMM yyyy 'at' HH:mm");
      },
      size: "auto" as unknown as number
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return <AccountTableAction data={data} resetParent={resetParent} />;
      },
      size: "auto" as unknown as number
    }
  ];
};
