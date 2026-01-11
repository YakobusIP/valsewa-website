"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { fetchAccountById } from "@/services/accountService";
import { AccountEntity, UploadResponse } from "@/types/account.type";
import { Calendar } from "@/components/ui/calendar";

export default function AccountDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [account, setAccount] = useState<AccountEntity | null>(null);
  const [loading, setLoading] = useState(true);

  // Skin UI state
  const [showSkins, setShowSkins] = useState(false);
  const [skinSearch, setSkinSearch] = useState("");
  const [mode, setMode] = useState<"RENT" | "BOOK">("RENT");
  const [qty, setQty] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState<{
    label: string;
    price: string;
  } | null>(null);
  const [bookDate, setBookDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>(""); // "09:00"
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    fetchAccountById(id)
      .then((res) => setAccount(res))
      .catch(() => setAccount(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setSelectedDuration(null);
  }, [mode]);

  const filteredSkins = useMemo(() => {
    if (!account?.skinList) return [];

    return account.skinList.filter((skin) =>
      skin.name.toLowerCase().includes(skinSearch.toLowerCase())
    );
  }, [account?.skinList, skinSearch]);

  const priceList = useMemo(() => {
    return account?.priceTier?.priceList ?? [];
  }, [account?.priceTier?.priceList]);

  function parseDurationToHours(duration: string): number {
    const lower = duration.toLowerCase().trim();

    if (lower.endsWith("h")) {
      return Number(lower.replace("h", ""));
    }

    if (lower.endsWith("d")) {
      return Number(lower.replace("d", "")) * 24;
    }

    return 0;
  }

  useEffect(() => {
    if (!selectedDuration || !startTime || qty === 0) {
      setEndTime("");
      return;
    }

    const durationHours = parseDurationToHours(selectedDuration.label);
    const totalHours = durationHours * qty;

    const [startHour, startMinute] = startTime.split(":").map(Number);

    const start = new Date();
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date(start.getTime() + totalHours * 60 * 60 * 1000);

    const hh = end.getHours().toString().padStart(2, "0");
    const mm = end.getMinutes().toString().padStart(2, "0");

    setEndTime(`${hh}:${mm}`);
  }, [selectedDuration, startTime, qty]);

  const bookTotalPrice = useMemo(() => {
    if (!selectedDuration || qty === 0) return 0;

    const basePrice = Number(selectedDuration.price);

    return basePrice * qty;
  }, [selectedDuration, qty]);

  const rentTotalPrice = useMemo(() => {
    if (!selectedDuration || qty === 0) return 0;

    return Number(selectedDuration.price) * qty;
  }, [selectedDuration, qty]);


  const isDisabled =
    (mode === "RENT" && (!selectedDuration || qty === 0)) ||
    (mode === "BOOK" &&
      (!selectedDuration || !bookDate || !startTime || qty === 0));



  function formatRentDuration(totalHours: number): string {
    if (!totalHours || totalHours <= 0) return "0h";

    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    if (days > 0) {
      return `${days}d:${hours}h`;
    }

    return `${hours}h`;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!account) return notFound();

  const images =
    account.thumbnail && account.otherImages?.length
      ? [{ ...account.thumbnail, isThumbnail: true }, ...account.otherImages]
      : account.otherImages ?? [account.thumbnail];


  function getRankImageUrl(rank: string): string {
    const r = rank.toLowerCase();

    if (r.includes("iron")) return "/rank/Iron 3.svg";
    if (r.includes("bronze")) return "/rank/Bronze 3.svg";
    if (r.includes("silver")) return "/rank/Silver 3.svg";
    if (r.includes("gold")) return "/rank/Gold 3.svg";
    if (r.includes("platinum")) return "/rank/Platinum 3.svg";
    if (r.includes("diamond")) return "/rank/Diamond 3.svg";
    if (r.includes("ascendant")) return "/rank/Ascendant 3.svg";
    if (r.includes("immortal")) return "/rank/Immortal 3.svg";
    if (r.includes("radiant")) return "/rank/Radiant 3.svg";

    return "/ranks/Unranked.svg";
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-[110px] px-4 lg:px-10">
        <div className="max-w-[1920px] mx-auto grid grid-cols-12 gap-8">

          {/* LEFT — GALLERY */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-1 max-h-[100vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {images.map((img: UploadResponse, i: number) => (
              <div
                key={i}
                className="relative aspect-video"
              >
                <Image
                  src={img?.imageUrl ?? "/defaultPicture/default.jpg"}
                  alt="Account Image"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* RIGHT — DETAILS */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            {/* TITLE */}
            <div className="grid grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-4 gap-y-1 items-center">
              {/* COL 1 — IMAGE (row-span 2) */}
              <div className="row-span-2">
                <Image
                  src={getRankImageUrl(account.accountRank)}
                  alt={account.accountRank}
                  width={56}
                  height={56}
                  className="object-contain"
                  priority
                />
              </div>

              {/* COL 2 ROW 1 — TITLE */}
              <h1 className="text-3xl font-bold text-white tracking-wide leading-tight">
                <span className="uppercase">{account.accountRank}</span>
                <span className="text-neutral-400"> | </span>
                <span>{account.accountCode}</span>
              </h1>

              {/* COL 3 — ACCOUNT INFO (row-span 2) */}
              <div className="row-span-2 flex items-center justify-end">
                <span className="flex items-center gap-1 text-blue-400 text-xs cursor-pointer hover:text-blue-300">
                  Account Info
                  <span className="flex items-center justify-center w-3 h-3 rounded-full bg-blue-400 text-black text-[10px] font-bold no-underline">
                    ?
                  </span>
                </span>
              </div>


              {/* COL 2 ROW 2 — PRICE TIER + STATUS */}
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 text-white px-2 py-0.5 text-xs rounded-sm">
                  {account.priceTier.code}
                </div>
              </div>
            </div>



            {/* META */}
            <div className="space-y-2 text-sm text-neutral-300">
              <div className="flex justify-between">
                <p>Rent Count:</p>
                <p>{formatRentDuration(account.totalRentHour)}</p>
              </div>
              <div className="flex justify-between">
                <p>Region: </p>
                <p>IDN</p>
              </div>
              <div className="flex justify-between">
                <p>Rank: </p>
                <p>{account.accountRank}</p>
              </div>
              <div className="flex justify-between">
                <span>
                  <div
                    className="flex items-center justify-between cursor-pointer select-none"
                    onClick={() => {
                      setShowSkins((prev) => !prev);
                      if (showSkins) setSkinSearch("");
                    }}
                  >
                    <p className="font-semibold">Skin List</p>

                    <span
                      className={`transition-transform duration-200 text-white bg-neutral-600 ml-2 p-0.5 ${showSkins ? "rotate-180" : "rotate-0"
                        }`}
                    >
                      ▲
                    </span>
                  </div>
                </span>

                <p>{account.skinList.length} Skins</p>
              </div>


            </div>

            {/* SKIN LIST */}
            <div className="space-y-3">


              {showSkins && (
                <div className="space-y-3">
                  {/* SEARCH */}
                  <input
                    type="text"
                    placeholder="Search Valorant skin..."
                    value={skinSearch}
                    onChange={(e) => setSkinSearch(e.target.value)}
                    className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-red-500"
                  />

                  {/* LIST */}
                  <div className="flex flex-wrap gap-2 max-h-[240px] overflow-y-auto pr-1">
                    {
                      filteredSkins.length === 0 ? (
                        <p className="text-sm text-neutral-500">
                          No skins found
                        </p>
                      ) : (
                        filteredSkins.map((skin, i) => (
                          <Badge
                            key={skin.id ?? i}
                            className="bg-neutral-800 text-neutral-200 hover:bg-red-600 transition"
                          >
                            {skin.name}
                          </Badge>
                        ))
                      )}
                  </div>
                </div>
              )}
            </div>

            {/* RENT / BOOK SECTION */}
            <div className="bg-neutral-900 rounded-xl p-4 space-y-4">
              {/* MODE TOGGLE */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode("RENT")}
                  className={`text-sm font-semibold py-2 rounded-md transition
                    ${mode === "RENT"
                      ? "bg-red-600 text-white"
                      : "bg-neutral-800 text-white hover:bg-neutral-700"}`}
                >
                  RENT NOW
                </button>

                <button
                  onClick={() => setMode("BOOK")}
                  className={`text-sm font-semibold py-2 rounded-md transition
                    ${mode === "BOOK"
                      ? "bg-red-600 text-white"
                      : "bg-neutral-800 text-white hover:bg-neutral-700"}`}
                >
                  BOOK FOR LATER
                </button>
              </div>

              {/* MODE CONTENT */}
              {mode === "RENT" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  {priceList.map((item) => {
                    const isActive = selectedDuration?.label === item.duration;

                    return (
                      <div
                        key={item.id}
                        onClick={() =>
                          setSelectedDuration({
                            label: item.duration,
                            price: item.normalPrice.toString()
                          })
                        }
                        className={`border rounded-md py-2 cursor-pointer transition
                          ${isActive
                            ? "border-red-600 bg-red-600/10"
                            : "border-neutral-700 hover:border-red-600"
                          }`}
                      >
                        <p className="text-xs font-semibold uppercase">{item.duration}</p>
                        <p className="text-[11px] text-neutral-400">
                          IDR {item.normalPrice.toLocaleString("id-ID")}
                        </p>
                      </div>
                    );
                  })}

                </div>
              )}

              {mode === "BOOK" && (
                <div className="space-y-4">

                  {/* DURATION SELECT */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    {priceList.map((item) => {
                      const isActive = selectedDuration?.label === item.duration;

                      return (
                        <div
                          key={item.id}
                          onClick={() =>
                            setSelectedDuration({
                              label: item.duration,
                              price: item.normalPrice.toString()
                            })
                          }
                          className={`border rounded-md py-2 cursor-pointer transition
                            ${isActive
                              ? "border-red-600 bg-red-600/10"
                              : "border-neutral-700 hover:border-red-600"
                            }`}
                        >
                          <p className="text-xs font-semibold uppercase">{item.duration}</p>
                          <p className="text-[11px] text-neutral-400">
                            IDR {item.normalPrice.toLocaleString("id-ID")}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* DATE + TIME */}
                  <div className="bg-neutral-900 rounded-xl p-4 grid grid-cols-2 gap-4">
                    {/* DATE */}
                    <div>
                      <Calendar
                        mode="single"
                        selected={bookDate ?? undefined}
                        onSelect={(date) => setBookDate(date ?? null)}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border border-neutral-800 bg-black text-white
                          [&_.rdp-day]:text-white

                          [&_.rdp-day[aria-selected=true]]:bg-red-500
                          [&_.rdp-day[aria-selected=true]]:text-white
                          [&_.rdp-day[aria-selected=true]]:shadow-[0_0_0_2px_rgba(239,68,68,0.5)]

                          [&_.rdp-day_today]:border
                          [&_.rdp-day_today]:border-red-500

                          [&_.rdp-nav_button]:text-white
                          [&_.rdp-caption_label]:text-white
                          [&_.rdp-head_cell]:text-neutral-400
                        "
                      />



                      <p className="mt-2 text-xs text-neutral-400">
                        {bookDate
                          ? `Selected: ${bookDate.toLocaleDateString("id-ID")}`
                          : "Select a date"}
                      </p>
                    </div>

                    {/* TIME */}
                    <div className="flex flex-col gap-3">
                      <p className="text-white text-sm font-semibold">Rental Time</p>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-neutral-400">Start Time</label>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="bg-neutral-800 text-white rounded-md px-2 py-1"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-neutral-400">End Time</label>
                        <input
                          type="time"
                          value={endTime}
                          disabled
                          className="bg-neutral-700 text-neutral-400 rounded-md px-2 py-1 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* QTY */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Qty</span>

                <div className="flex items-center bg-neutral-800 rounded-md overflow-hidden">
                  <button
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1 text-lg hover:bg-neutral-700"
                  >
                    −
                  </button>

                  <span className="px-4 text-sm">{qty}</span>

                  <button
                    onClick={() => setQty((prev) => prev + 1)}
                    className="px-3 py-1 text-lg hover:bg-neutral-700"
                  >
                    +
                  </button>
                </div>
              </div>


              <button
                disabled={isDisabled}
                className={`w-full font-semibold py-3 rounded-md transition
                  ${isDisabled
                    ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
              >
                {mode === "RENT" && selectedDuration && (
                  <>IDR {rentTotalPrice.toLocaleString("id-ID")} | Rent Now</>
                )}

                {mode === "BOOK" && selectedDuration && (
                  <>IDR {bookTotalPrice.toLocaleString("id-ID")} | Book Now</>
                )}


                {mode === "RENT" && !selectedDuration && "Select Duration"}
                {mode === "BOOK" && !selectedDuration && "Select Date"}
              </button>


              {/* FOOTER */}
              <div className="text-center text-xs text-neutral-400 space-y-2">
                <p>Any Questions?</p>
                <button className="w-full bg-neutral-700 hover:bg-neutral-600 py-2 rounded-md text-white">
                  Ask Our Team
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </main>
  );
}
