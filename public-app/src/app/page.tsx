'use client'
import Image from "next/image";
import Card from "@/components/Card";
import axios from "axios";
import { useState, useEffect } from "react";

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

export default function Home() {
  const [accountList, setAccountList] = useState<CardItem[]>([]);
  const [searchText, setSearchText] = useState("");

  const fetchAccounts = async (search: string) => {
    try {
      const url = `http://localhost:5000/api/accounts?page=1&limit=100&q=${encodeURIComponent(
        search
      )}`;
      const response = await axios.get<{ data: CardItem[] }>(url);
      setAccountList(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAccounts(searchText);
  };

  useEffect(() => {
    // Initial fetch without any search text
    fetchAccounts("");
  }, []);

  return (
    <section className=" bg-slate-200 pb-64">
      <div className="w-full">
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
            <h1 className="font-bold text-5xl ">Cari Akun Impianmu Disini</h1>
            <p className="font-extralight text-xl ">
              Buat yang pengen keliatan jago
            </p>
          </div>

          <div className="flex justify-between items-center mt-12">
            <form className="w-[40%]" onSubmit={handleSearchSubmit}>
              <label htmlFor="default-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
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
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
                  placeholder="Search for items.."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 px-4 py-2"
                >
                  Search
                </button>
              </div>
            </form>

            <form>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
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
