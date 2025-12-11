import SkinDetailModal from "@/components/skin-management/SkinDetailModal";
import { Checkbox } from "@/components/ui/checkbox";

import { Skin } from "@/types/skin.type";

import { ColumnDef } from "@tanstack/react-table";

export const skinColumns: ColumnDef<Skin>[] = [{
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
        const { image, name } = row.original;
        return (
            <div className="p-1">
                <img
                src={image || ""}
                alt={name || "Skin image"}
                className="h-24 w-24 rounded-md object-contain"
                loading="lazy"
            />
            </div>
        );
    },
    size: "auto" as unknown as number,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className="whitespace-pre-wrap line-clamp-5">
          {data.name}
        </span>
      );
    },
    size: "auto" as unknown as number
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className="whitespace-pre-wrap line-clamp-5">
          {data.keyword}
        </span>
      );
    },
    size: "auto" as unknown as number
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return <SkinDetailModal mode="edit" data={data} />;
    },
    size: "auto" as unknown as number
  }
];
