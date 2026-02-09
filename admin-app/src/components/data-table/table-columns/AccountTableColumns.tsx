import { accountService } from "@/services/account.service";

import AccountTableAction from "@/components/data-table/AccountTableAction";
import AvailabilityStatus from "@/components/data-table/AvailabilityStatus";
import { Checkbox } from "@/components/ui/checkbox";

import { AccountEntity } from "@/types/account.type";

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
      accessorKey: "priceTier",
      accessorFn: ({ priceTier }) => {
        return priceTier.code;
      },
      header: "Price Tier",
      size: "auto" as unknown as number
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
      accessorKey: "nickname",
      header: "Nickname",
      size: "auto" as unknown as number
    },
    {
      accessorKey: "accountRank",
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
      accessorKey: "currentBookingDate",
      header: "Current Booking Date",
      cell: ({ getValue }) => {
        const raw = getValue() as unknown;

        let date: Date | null = null;

        if (raw instanceof Date) {
          date = raw;
        } else if (typeof raw === "string" || typeof raw === "number") {
          const parsed = new Date(raw);
          if (!isNaN(parsed.getTime())) {
            date = parsed;
          }
        }

        if (!date) {
          return "-";
        }

        return format(date, "dd MMMM yyyy 'at' HH:mm");
      },
      size: "auto" as unknown as number
    },
    {
      accessorKey: "currentExpireAt",
      header: "Current Expire At",
      cell: ({ getValue }) => {
        const raw = getValue() as unknown;

        let date: Date | null = null;

        if (raw instanceof Date) {
          date = raw;
        } else if (typeof raw === "string" || typeof raw === "number") {
          const parsed = new Date(raw);
          if (!isNaN(parsed.getTime())) {
            date = parsed;
          }
        }

        if (!date) {
          return "-";
        }

        return format(date, "dd MMMM yyyy 'at' HH:mm");
      },
      size: "auto" as unknown as number
    },
    {
      accessorKey: "nextBookingDate",
      header: "Next Booking Date",
      cell: ({ getValue }) => {
        const raw = getValue() as unknown;

        let date: Date | null = null;

        if (raw instanceof Date) {
          date = raw;
        } else if (typeof raw === "string" || typeof raw === "number") {
          const parsed = new Date(raw);
          if (!isNaN(parsed.getTime())) {
            date = parsed;
          }
        }

        if (!date) {
          return "-";
        }

        return format(date, "dd MMMM yyyy 'at' HH:mm");
      },
      size: "auto" as unknown as number
    },
    {
      accessorKey: "nextExpireAt",
      header: "Next Expire At",
      cell: ({ getValue }) => {
        const raw = getValue() as unknown;

        let date: Date | null = null;

        if (raw instanceof Date) {
          date = raw;
        } else if (typeof raw === "string" || typeof raw === "number") {
          const parsed = new Date(raw);
          if (!isNaN(parsed.getTime())) {
            date = parsed;
          }
        }

        if (!date) {
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
