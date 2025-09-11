declare type GetErrorResponse = {
  message: string;
  code: number;
};

declare type GetSuccessResponse<T> = {
  data: T;
  message: string;
};

declare type GetApiResponse<T> = GetErrorResponse | GetSuccessResponse<T>;
