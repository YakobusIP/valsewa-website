type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  username: string;
  accessToken: string;
  refreshToken: string;
};

type ValidateResponse = {
  username: string;
};

export type { LoginRequest, LoginResponse, ValidateResponse };
