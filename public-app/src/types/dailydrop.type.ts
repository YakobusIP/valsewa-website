export type PublicDailyDrop = {
  slot: number;
  discount: number;
  priceList: {
    id: number;
    duration: string;
    unratedPrice: number;
    compPrice: number;
  };
  account: {
    id: number;
    accountCode: string;
    accountRank: string;
    nickname: string;
    isCompetitive: boolean;
    availabilityStatus: string;
    skinCount: number;
    thumbnail: { imageUrl: string } | null;
    priceTier: {
      id: number;
      code: string;
    };
  };
};
