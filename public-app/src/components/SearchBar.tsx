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
  accountList,
  setSearchAccount,
  changeDirection,
  getSortLabel,
  sortAccount,
  sortDirection
}: Props) => {
  const SortMenuItem = ({ label, value }: { label: string; value: string }) => (
    <DropdownMenuItem
      onClick={() => changeDirection(value)}
      className="px-4 py-2 hover:bg-[#4e4e75] transition duration-200 cursor-pointer flex justify-between"
    >
      {label}
      {sortAccount === value && (
        <Image
          src="/arrow.svg"
          alt="Sort Arrow"
          width={16}
          height={16}
          className={`ml-2 transition-transform duration-200 ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`}
        />
      )}
    </DropdownMenuItem>
  );

  return (
    <div className="w-full flex flex-col items-center text-roseWhite">
      <h1 className="font-bold text-5xl text-center">FIND THE BEST</h1>
      <p className="font-extralight text-xl text-center">VALORANT ACCOUNTS</p>
      <div className="w-full px-14 pt-6 ">
        <div className="relative min-h-24 flex flex-col md:flex-row w-full items-center bg-[#262A43] border border-gray-500 rounded-[16px] py-3 shadow-md shadow-white/30">
          <div className="flex items-center mb-2 md:mb-0 text-nowrap md:pl-5">
            <span className="text-yellow-400 font-bold text-lg md:text-xl mr-2">
              {accountList.length}
            </span>
            <span className="text-roseWhite font-bold">Akun Tersedia</span>
          </div>

          <div className="flex flex-row md:flex-row items-center justify-between w-full gap-2 md:gap-4 md:ml-10 px-3">
            <div className="relative flex-grow w-full md:w-full">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-300"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                className="w-full pl-10 pr-4 py-2 bg-[#8f8fb3] text-gray-200 rounded-[43px] outline-none placeholder-roseWhite md:min-h-[56px]"
                placeholder="Search items..."
                onChange={(e) => setSearchAccount(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center md:min-h-[56px] justify-between w-[130px] md:w-[150px] px-4 py-2 bg-[#8f8fb3] rounded-[43px] hover:bg-[#4e4e75] text-gray-200">
                {getSortLabel()}
                {["rank", "price_tier", "availability"].includes(
                  sortAccount
                ) && (
                  <Image
                    src="/arrow.svg"
                    alt="Sort Arrow"
                    width={16}
                    height={16}
                    className={`ml-2 transition-transform duration-200 ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`}
                  />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#6c6c8f] text-roseWhite rounded-lg">
                <SortMenuItem label="Rank" value="rank" />
                <SortMenuItem label="Price Tier" value="price_tier" />
                <SortMenuItem label="Availability" value="availability" />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
