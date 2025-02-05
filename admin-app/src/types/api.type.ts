type ApiResponseList<T> = {
  data: T[];
  meta: { pagination: PaginationMetadata };
};

type ApiResponseError = {
  error: {
    status: number;
    name: string;
    message: string;
  };
};

type PaginationMetadata = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type { ApiResponseList, ApiResponseError, PaginationMetadata };
