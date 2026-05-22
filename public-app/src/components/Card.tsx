"use client";

import { AccountEntity } from "@/types/account.type";

import InventoryAccountCard from "./InventoryAccountCard";

interface CardProps {
  data?: AccountEntity[];
}

const Card: React.FC<CardProps> = ({ data }) => {
  const processCardData = (items?: AccountEntity[]) => {
    return items?.map((item) => ({
      ...item,
      otherImages:
        item.thumbnail && item.otherImages
          ? [{ ...item.thumbnail, isThumbnail: true }, ...item.otherImages]
          : item.otherImages
    }));
  };

  const processedData = processCardData(data);

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[1920px]">
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-3xl md:text-5xl font-antonio font-black text-white tracking-tighter uppercase relative">
              FULL INVENTORY
            </h2>
          </div>
          <p className="text-white/70 text-xs md:text-lg">
            Explore 100+ Premium Accounts today!
          </p>
        </div>
        <div
          className="
              grid grid-cols-12 
              gap-x-3 gap-y-4
              sm:gap-x-6 sm:gap-y-6
              lg:gap-x-8 lg:gap-y-10
              justify-items-center
              font-instrumentSans
            "
        >
          {processedData?.map((item) => (
            <InventoryAccountCard
              key={item.id}
              item={item}
              linkClassName="col-span-6 sm:col-span-6 lg:col-span-4"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card;
