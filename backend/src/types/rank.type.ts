type RankErrorResponse = {
  errors: [
    {
      code: number;
      message: string;
      status: number;
    }
  ];
};

type RankDataResponse = {
  status: number;
  data: {
    name: string;
    tag: string;
    current_data: {
      currenttier: number;
      currenttierpatched: string;
    };
  };
};

export type { RankErrorResponse, RankDataResponse };
