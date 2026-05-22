type Skin = {
  id: number;
  name: string;
  imageUrl: string;
  keyword: string;
};

type SkinRequest = Omit<Skin, "id">;

type SkinImage = {
  name: string;
  imageUrl: string;
};

export type { Skin, SkinRequest, SkinImage };
