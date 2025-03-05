'use client'
import Card from "@/components/Card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccountController } from "@/controllers/useAccountController";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { AccountEntity } from "@/types/account.type";

interface Props{
    initialAccount: AccountEntity[]
}
export default function Home({initialAccount}:Props) {
  const {
    accountList,
    setSearchAccount,
    sortAccount,
    sortDirection,
    changeDirection,
    getSortLabel,
  } = useAccountController(initialAccount);

  const SortMenuItem = ({ label, value }: { label: string; value: string }) => (
    <DropdownMenuItem
      onClick={() => changeDirection(value)}
      className="px-4 py-2 hover:bg-[#8B0000] transition duration-200 cursor-pointer flex justify-between"
    >
      {label}
      {sortAccount === value && (
        <span className="ml-2 text-lg">
          {sortDirection === "asc" ? "▲" : "▼"}
        </span>
      )}
    </DropdownMenuItem>
  );

  return (
    <section className="bg-gray-900 pb-32 relative">
      <div className="w-full relative">
        <figure className="absolute z-50 top-0 lg:max-w-[200px] sm:max-w-[150px] max-w-[120px] left-5">
  <Image src="/logo/Logo Valsewa 2 SVG.svg" width={250} height={100} alt="logo" className="object-contain"/>
</figure>

        <figure className="relative w-full before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-gray-900 before:z-10 max-md:hidden">
          <AspectRatio ratio={16 / 5}>
            <Image
              src="/hero/Hero9.png"
              fill
              alt="Hero"
              className="object-cover object-top"
            />
          </AspectRatio>
        </figure>
        <figure className="relative w-full before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-gray-900 before:z-10 md:hidden">
          <AspectRatio ratio={16 / 12}>
            <Image
              src="/hero/Hero9.png"
              fill
              alt="Main Pict"
              className="object-cover object-top"
            />
          </AspectRatio>
        </figure>

        <div className="mx-5 pt-10">
          <div className="flex flex-col items-center text-roseWhite">
            <h1 className="font-bold text-5xl text-center">
              Cari Akun Impianmu Disini
            </h1>
            <p className="font-extralight text-xl text-center">
              Buat yang pengen keliatan jago
            </p>
          </div>

          <div className="flex sm:justify-between flex-col sm:flex-row sm:items-center items-start max-sm:gap-y-4 mt-12 px-3">
            <div className="relative sm:w-[70%] w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-roseWhite font-bold  dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
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
                className="block w-full p-4 ps-10 text-sm text-roseWhite border border-gray-300 rounded-lg bg-gray-800 animated-bg h-[50px]"
                placeholder="Ascendant Reaver vandal ..."
                onChange={(e) => setSearchAccount(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-[150px] h-[50px] items-center gap-2 px-4 py-2 rounded-lg bg-[#8B0000] hover:bg-[#A00000] text-roseWhite ">
                {getSortLabel()}
                {["rank", "price_tier", "availability"].includes(
                  sortAccount
                ) && (
                  <span className="ml-1 text-lg">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border border-[#8B0000] text-roseWhite rounded-lg">
                <SortMenuItem label="Rank" value="rank" />
                <SortMenuItem label="Price Tier" value="price_tier" />
                <SortMenuItem label="Availability" value="availability" />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
{accountList.length>0? (
          <div className="mt-9 w-full mx-0 pt-10">
            
            <Card data={accountList} />

            
          </div>
          ):(
            <div className=" mt-48">
              <div className="flex items-center ps-3 pointer-events-none justify-center">
                <svg
                  className="w-16 h-16 text-roseWhite font-bold  dark:text-gray-400 p-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
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
              <p className="text-roseWhite text-3xl font-semibold text-center">Mohon maaf Akun tidak ditemukan</p>
              <p className="text-roseWhite text-xl font-normal text-center max-w-[300px] mx-auto">Coba lakukan pencarian untuk skin / preferensi yang lain</p>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

