// export type AxiosErrorType = AxiosError<{
//   error: string;
// }>;

export interface AxiosErrorType {
  status: number;
  response: {
    data: unknown | null;
    result: {
      status: number;
      code: string;
      message: string;
    };
  };
}
