import Image from "next/image";
import Card from "@/components/Card"
import axios from "axios";

interface CardItem {
  id: number;
  username: string;
  accountCode: string;
  description: string;
  accountRank: string;
  availabilityStatus: string;
  nextBooking?: Date | null;
  nextBookingDuration?: Date | null;
  expireAt?: Date | null;
  totalRentHour: number;
  password: string;
  passwordUpdatedAt: Date | null;
  skinList: string[];
  createdAt: Date;
  updatedAt: Date;
  priceTierId: number;
  thumbnailId: number;
  priceTier: {
    id: number;
    code: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
  thumbnail: {
    id: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    accountId?: number | null;
  };
  otherImages: {
    id: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    accountId?: number | null;
  }[];
}
export default async function Home() {
  
  const response = await axios.get<{data: CardItem[]}>("http://localhost:5000/api/accounts?page=1&limit=100");
  const accountList = response.data.data;
  
  return (
    <section className=" bg-slate-200 pb-64">
      <div className="w-full ">
        <figure className="relative w-full h-[500px]">
          <Image
            src="/1920x500.svg"
            fill
            alt="Main Pict"
            className="  object-cover object-center "
          />
        </figure>
        <div className="mx-5 pt-10">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-5xl ">
              Cari Akun Impianmu Disini
            </h1>
            <p className="font-extralight text-xl ">
              Buat yang pengen keliatan jago
            </p>
          </div>

          <div className="flex justify-between items-center mt-12 ">
            <form className="w-[40%] ">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items.."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>

            <form className="">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="rank">Rank</option>
                <option value="priceTiers">Price Tiers</option>
              </select>
            </form>
          </div>

          <div className="mt-9 w-full mx-0">
            <Card data={accountList} />
          </div>
        </div>
      </div>
    </section>
  );
}
