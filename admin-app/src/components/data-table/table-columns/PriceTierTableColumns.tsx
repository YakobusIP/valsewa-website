import PriceTierDetailModal from "@/components/pricetier-management/PriceTierDetailModal";
import { Checkbox } from "@/components/ui/checkbox";

import { PriceTier } from "@/types/pricetier.type";

import { ColumnDef } from "@tanstack/react-table";

export const priceTierColumns: ColumnDef<PriceTier>[] = [
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
    accessorKey: "code",
    header: "Code",
    size: "auto" as unknown as number
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const data = row.original;
      return <span className="whitespace-pre-wrap">{data.description}</span>;
    },
    size: "auto" as unknown as number
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return <PriceTierDetailModal mode="edit" data={data} />;
    },
    size: "auto" as unknown as number
  }
];
