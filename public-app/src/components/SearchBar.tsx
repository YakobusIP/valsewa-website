"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { AccountEntity } from "@/types/account.type";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

interface Props {
  accountList: AccountEntity[];
  setSearchAccount: (value: string) => void;
  changeDirection: (value: string) => void;
  getSortLabel: () => string;
  sortAccount: string;
  sortDirection: string;
}

const SearchBar = ({
  setSearchAccount,
  changeDirection,
  sortAccount,
  sortDirection
}: Props) => {
  const Menu = ({
    label,
    value
  }: {
    label: string;
    value: string;
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between px-4 py-2 rounded-xl bg-[#0f0f0f] border border-gray-600 text-white min-w-[110px] tablet:min-w-[140px]">
        {label}
        <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20">
          <path
            fill="currentColor"
            d="M5 7l5 5 5-5H5z"
          />
        </svg>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-[#1c1c1c] text-white border border-gray-600">
        <DropdownMenuItem onClick={() => changeDirection(value)}>
          Sort {label}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1920px] px-4 tablet:px-10">

        {/* CONTAINER */}
        <div className="flex flex-col tablet:flex-row items-center justify-between gap-4 tablet:gap-6 bg-black border border-gray-500 rounded-2xl px-4 tablet:px-6 py-3 shadow-lg">

          {/* LEFT: FILTERS */}
          <div className="flex flex-wrap items-center gap-3 tablet:gap-4 w-full tablet:w-auto">
            <Menu label="Rank" value="rank" />
            <Menu label="Price" value="price_tier" />
            <Menu label="Tier" value="availability" />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 w-full tablet:w-auto">

            {/* DAILY DROP BUTTON */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-600 bg-black hover:bg-red-600/20 transition text-white whitespace-nowrap">
              <img src="/header/streak icon.svg"></img>
              <span className="font-bold text-red-500">DAILY DROP</span>
            </button>

            {/* SEARCH INPUT */}
            <div className="relative w-full tablet:w-[260px] desktop:w-[320px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>

              <input
                type="search"
                placeholder="Search by skin name..."
                onChange={(e) => setSearchAccount(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0f0f0f] border border-gray-600 rounded-xl text-white placeholder-gray-400 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;