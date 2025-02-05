import AccountTableAction from "@/components/data-table/AccountTableAction";
import ProgressStatus from "@/components/data-table/ProgressStatus";
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
      accessorKey: "account_code",
      header: "Code",
      size: "auto" as unknown as number
    },
    {
      accessorKey: "username",
      header: "Username",
      size: "auto" as unknown as number
    },
    {
      accessorKey: "account_rank",
      accessorFn: ({ account_rank }) => {
        const rank = ranks.find((rank) => rank.value === account_rank);
        return rank ? rank.label : "-";
      },
      header: "Rank",
      size: "auto" as unknown as number
    },
    {
      accessorKey: "progressStatus",
      header: "Progress Status",
      cell: ({ row }) => {
        const account = row.original;
        return (
          <ProgressStatus
            id={account.id}
            availabilityStatus={account.availability_status}
            //   serviceFn={updateAnimeProgressStatusService}
          />
        );
      },
      size: "auto" as unknown as number
    },
    {
      accessorKey: "next_booking",
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
      accessorKey: "expire_at",
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
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return <AccountTableAction data={data} resetParent={resetParent} />;
      },
      size: "auto" as unknown as number
    }
  ];
};
