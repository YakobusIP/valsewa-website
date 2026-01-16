"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFire, FaArrowRight } from "react-icons/fa";
import { AccountEntity } from "@/types/account.type";
import { fetchRecommendedAccounts } from "@/services/accountService";
import { cn, convertHoursToDays, getRankImageUrl } from "@/lib/utils";

export default function RecommendedSection() {
    const [accounts, setAccounts] = useState<AccountEntity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchRecommendedAccounts();
                setAccounts(data.slice(0, 3)); // Ensure we only take top 3
            } catch (error) {
                console.error("Failed to load recommended accounts", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return null; // Or a skeleton loader
    if (accounts.length === 0) return null;

    return (
        <section className="w-full relative z-10 mb-12">
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
                {/* Header */}
                <div className="flex flex-col mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl md:text-5xl font-antonio font-black text-white tracking-tighter uppercase relative">
                            Trending Now
                            <span className="inline-block ml-3 text-[#C70515] animate-pulse">
                                <FaFire />
                            </span>
                        </h2>
                    </div>
                    <p className="text-white/70 text-xs md:text-lg">Most rented accounts this week</p>
                </div>

                {/* Grid */}
                <div
                    className="
                        flex gap-4 overflow-x-auto pb-2
                        snap-x snap-mandatory
                        xl:grid xl:grid-cols-4
                        xl:overflow-visible
                    "
                >
                    {accounts.map((account, index) => {
                        // Construct displayed tier and rank info
                        // Assuming accountCode format like "SSS-01" or similar
                        const tierCode = account.priceTier?.code || "N/A";
                        const letterGrade = tierCode.split("-")[0] || "B"; // Fallback to B? Or parse from priceTier

                        // Parsing color based on letter grade for styling
                        let glowColor = "from-gray-500/20";
                        let textColor = "text-gray-400";
                        let borderColor = "border-gray-600";

                        if (letterGrade.includes("SSS")) {
                            glowColor = "from-[#9146FF]/30";
                            textColor = "text-[#9146FF]";
                            borderColor = "border-[#9146FF]";
                        } else if (letterGrade.includes("S")) {
                            glowColor = "from-[#3B5BDB]/30";
                            textColor = "text-[#3B5BDB]";
                            borderColor = "border-[#3B5BDB]";
                        } else if (letterGrade.includes("A")) {
                            glowColor = "from-[#BD2C2C]/30";
                            textColor = "text-[#BD2C2C]";
                            borderColor = "border-[#BD2C2C]";
                        } else if (letterGrade.includes("B")) {
                            glowColor = "from-[#C69C6D]/30"; // Gold/Bronze
                            textColor = "text-[#C69C6D]";
                            borderColor = "border-[#C69C6D]";
                        } else if (letterGrade.includes("V")) {
                            glowColor = "from-[#3CCFCF]/30";
                            textColor = "text-[#3CCFCF]";
                            borderColor = "border-[#3CCFCF]";
                        }

                        return (
                            <div
                                key={account.id}
                                className={cn(
                                    "group relative h-[360px] rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02]",
                                    "border-white/10 hover:border-white/30 bg-[#111]",
                                    // Mobile horizontal sizing
                                    "min-w-[75%] snap-start sm:min-w-[320px] xl:min-w-0"
                                )}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={account.thumbnail?.imageUrl ?? "/defaultPicture/default.jpg"}
                                        fill
                                        alt="Thumbnail"
                                        className="object-cover rounded-xl"
                                        unoptimized
                                    />
                                    {/* <Image
                                        src={bgImage}
                                        alt={account.nickname}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                                    /> */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                </div>

                                {/* Badges */}
                                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                    <span className="bg-[#4ade80] text-black text-[10px] sm:text-xs font-bold px-3 py-1 rounded shadow-lg">
                                        Most Rented
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                                    {/* Rank Name */}
                                    <div className="flex items-center gap-2 mb-1">
                                        {/* Rank Icon if available - reusing approach from DiscoverSection or just text */}
                                        {/* Rank Icon if available */}
                                        <Image
                                            src={getRankImageUrl(account.accountRank)}
                                            alt={account.accountRank}
                                            width={24}
                                            height={24}
                                            className="object-contain" // Or w-6 h-6
                                        />
                                        <span className="text-white font-bold text-xs sm:text-sm tracking-wide uppercase">
                                            {account.accountRank} | {account.accountCode}
                                        </span>
                                    </div>

                                    {/* Big Letter Grade & Stats */}
                                    <div className="flex items-end mt-2 gap-8">
                                        <span className="text-5xl md:text-7xl font-black italic leading-none tracking-tighter text-white font-antonio">
                                            {letterGrade}
                                        </span>

                                        <div className="flex flex-col gap-2 mb-1">
                                            <span className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                                                <span className="text-white/70 text-[10px]">Skins Amount</span>
                                                <span className="text-white font-bold text-[10px] sm:text-xs">| {account.skinList?.length || 0}</span>
                                            </span>
                                            <span className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                                                <span className="text-white/70 text-[10px]">Rent Count</span>
                                                <span className="text-white font-bold text-[10px] sm:text-xs">| {convertHoursToDays(account.totalRentHour)}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Glow Effect */}
                                <div className={cn("absolute inset-0 bg-gradient-to-t opacity-30 pointer-events-none", glowColor)} />

                                <div className={cn("absolute inset-0 border-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", borderColor)} />
                            </div>
                        );
                    })}

                    {/* Discover More Card */}
                    <Link
                        href="/#card-section"
                        className="
                            group relative h-[360px] rounded-2xl overflow-hidden
                            bg-gradient-to-br from-[#770000] to-black
                            border border-white/10
                            flex flex-col items-center justify-center text-left
                            transition-all duration-300 hover:scale-[1.02]
                            min-w-[75%] snap-start sm:min-w-[320px] xl:min-w-0
                        "
                    >
                        <div className="relative z-10 p-6">
                            <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                                Discover<br />More
                            </h3>
                            <div className="mt-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto group-hover:bg-white/20 transition-colors">
                                <FaArrowRight className="text-white text-xl group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        {/* Red Glow */}
                        <div className="absolute inset-0 bg-red-600/20 blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
