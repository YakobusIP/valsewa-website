"use client";

import { useEffect, useState } from "react";

import { fetchAccountById } from "@/services/accountService";

import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";

export default function AccountDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccountById(id)
      .then((res) => setAccount(res))
      .catch(() => setAccount(null))
      .finally(() => setLoading(false));
  }, [id]);

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
      : (account.otherImages ?? [account.thumbnail]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-[150px] px-4 lg:px-10">
        <div className="max-w-[1920px] mx-auto grid grid-cols-12 gap-8">
          {/* LEFT — GALLERY */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-4">
            {images.map((img: any, i: number) => (
              <div
                key={i}
                className="relative aspect-video rounded-xl overflow-hidden"
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
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-red-500">
                {account.accountRank} | {account.accountCode}
              </h1>

              <div className="flex gap-2 mt-2 items-center">
                <Badge className="bg-red-600">{account.priceTier.code}</Badge>

                {account.availabilityStatus === "AVAILABLE" && (
                  <span className="text-green-400 text-sm">Available</span>
                )}
                {account.availabilityStatus === "IN_USE" && (
                  <span className="text-yellow-400 text-sm">In Use</span>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm text-neutral-300">
              <p>Region: IDN</p>
              <p>Nickname: {account.nickname}</p>
              <p>Total Skins: {account.skinList.length}</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Skin List</p>
              <div className="flex flex-wrap gap-2">
                {account.skinList.map((skin: string, i: number) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-neutral-800 text-neutral-200"
                  >
                    {skin}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                RENT NOW
              </Button>

              <Button variant="outline" className="w-full border-red-600">
                BOOK FOR LATER
              </Button>
            </div>

            <div className="bg-neutral-900 rounded-xl p-4 text-center">
              <p className="text-lg font-bold text-red-500">
                {account.priceTier.description}
              </p>
              <p className="text-sm text-neutral-400">Price Tier</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
