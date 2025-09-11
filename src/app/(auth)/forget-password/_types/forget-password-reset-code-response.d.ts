declare type ErrorResetCodeResponse = {
  message: string;
  code: number;
};
declare type SuccessResetCodeRespons = {
  status: string;
};
declare type ApiResetCodeResponse =
  | ErrorResetCodeResponse
  | SuccessResetCodeResponse;
