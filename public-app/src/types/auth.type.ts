type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  id: number;
  username: string;
  pubAccessToken: string;
  pubRefreshToken: string;
};

type ValidateResponse = {
  username: string;
};

export type { LoginRequest, LoginResponse, ValidateResponse };
