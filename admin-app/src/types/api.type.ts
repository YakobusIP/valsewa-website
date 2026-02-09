type ApiResponseList<T> = {
  data: T[];
  metadata: MetadataResponse;
};

type ApiResponse<T> = {
  data: T;
  metadata: MetadataResponse;
};

type ApiResponseError = {
  error: string;
};

type MessageResponse = {
  message: string;
};

type MetadataResponse = {
  page: number;
  limit: number;
  pageCount: number;
  total: number;
};

export type {
  ApiResponseList,
  ApiResponse,
  ApiResponseError,
  MessageResponse,
  MetadataResponse
};
