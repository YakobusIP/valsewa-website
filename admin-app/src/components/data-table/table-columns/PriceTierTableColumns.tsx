import PriceTierDetailModal from "@/components/pricetier-management/PriceTierDetailModal";
import { Checkbox } from "@/components/ui/checkbox";

import { PriceTier } from "@/types/pricetier.type";

import { ColumnDef } from "@tanstack/react-table";

const formatShortIDR = (value: number) => {
  if (!Number.isFinite(value)) return "-";

  if (value >= 1_000_000_000) return `${+(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${+(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
  return `${value}`;
};

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
    accessorKey: "normalList",
    header: "Normal Price List",
    cell: ({ row }) => {
      const data = row.original;

      const text = Array.isArray(data.priceList)
        ? data.priceList
            .map(
              (item) =>
                `${item.duration} = ${formatShortIDR(Number(item.normalPrice))}`
            )
            .join("\n")
        : "";

      return <span className="whitespace-pre-wrap line-clamp-5">{text}</span>;
    },
    size: "auto" as unknown as number
  },
  {
    accessorKey: "lowList",
    header: "Low Rank Price List",
    cell: ({ row }) => {
      const data = row.original;

      const text = Array.isArray(data.priceList)
        ? data.priceList
            .map(
              (item) =>
                `${item.duration} = ${formatShortIDR(Number(item.lowPrice))}`
            )
            .join("\n")
        : "";

      return <span className="whitespace-pre-wrap line-clamp-5">{text}</span>;
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
