import { PriceTier } from "@/types/pricetier.type";

type AccountEntity = {
  id: number;
  documentId: string;
  username: string;
  account_code: string;
  description?: string;
  account_rank: string;
  availability_status: string;
  next_booking?: Date;
  next_booking_duration?: number;
  expire_at?: Date;
  total_rent_hour: number;
  password: string;
  password_updated_at: Date;
  skins: Skins;
  thumbnail: Images;
  other_images: Images[] | null;
  price_tier: PartialPriceTier;
};

type AccountEntityRequest = Omit<
  AccountEntity,
  | "id"
  | "documentId"
  | "price_tier"
  | "thumbnail"
  | "other_images"
  | "total_rent_hour"
> & {
  price_tier: number;
  thumbnail: number;
  other_images: number[];
};

type PartialPriceTier = Pick<PriceTier, "id" | "code" | "description">;

type Images = {
  id: number;
  url: string;
};

type Skins = {
  names: string[];
};

export type { AccountEntity, AccountEntityRequest };
