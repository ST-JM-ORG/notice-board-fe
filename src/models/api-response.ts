export interface ApiResponse<T = null | undefined> {
  data: T;
  result: {
    status: number;
    code: string;
    message: string;
    target: string | null;
  };
}
