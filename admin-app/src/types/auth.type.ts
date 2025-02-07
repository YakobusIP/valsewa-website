type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  username: string;
};

type ValidateResponse = {
  username: string;
};

export type { LoginRequest, LoginResponse, ValidateResponse };
