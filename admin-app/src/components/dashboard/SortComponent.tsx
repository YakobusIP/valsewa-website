import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { SORT_ORDER } from "@/lib/enums";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

type Props = {
  sortBy: string;
  sortOrder: SORT_ORDER;
  handleSort: (key: string) => void;
};

export default function SortComponent({
  sortBy,
  sortOrder,
  handleSort
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          Sort by:{" "}
          {sortBy === "id_tier"
            ? "Account Code"
            : sortBy === "rank"
              ? "Rank"
              : sortBy === "price_tier"
                ? "Price Tier"
                : "Availability"}
          {sortBy !== "id_tier" ? (
            sortOrder === SORT_ORDER.ASCENDING ? (
              <ArrowUpIcon className="ml-2 w-4 h-4" />
            ) : (
              <ArrowDownIcon className="ml-2 w-4 h-4" />
            )
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dropdown-content-width-full">
        <DropdownMenuItem onClick={() => handleSort("id_tier")}>
          Account Code
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("rank")}>
          Rank
          {sortBy === "rank" && (
            <span className="ml-1">
              {sortOrder === SORT_ORDER.ASCENDING ? (
                <ArrowUpIcon className="w-4 h-4" />
              ) : (
                <ArrowDownIcon className="w-4 h-4" />
              )}
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("price_tier")}>
          Price Tier
          {sortBy === "price_tier" && (
            <span className="ml-1">
              {sortOrder === SORT_ORDER.ASCENDING ? (
                <ArrowUpIcon className="w-4 h-4" />
              ) : (
                <ArrowDownIcon className="w-4 h-4" />
              )}
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("availability")}>
          Availability
          {sortBy === "availability" && (
            <span className="ml-1">
              {sortOrder === SORT_ORDER.ASCENDING ? (
                <ArrowUpIcon className="w-4 h-4" />
              ) : (
                <ArrowDownIcon className="w-4 h-4" />
              )}
            </span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
