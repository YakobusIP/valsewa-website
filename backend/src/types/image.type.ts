type WeaponsResponse = {
  status: number;
  data: Weapon[];
};

type Weapon = {
  skins?: SkinPayload[];
};

type SkinPayload = {
  displayName?: string;
  levels?: { displayIcon?: string | null }[];
  chromas?: { fullRender?: string | null }[];
};

export type { WeaponsResponse, Weapon, SkinPayload };
