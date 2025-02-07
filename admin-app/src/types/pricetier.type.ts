type PriceTier = {
  id: number;
  code: string;
  description: string;
};

type PriceTierRequest = Omit<PriceTier, "id">;

export type { PriceTier, PriceTierRequest };
