export interface ApiResponse<T> {
  data: T | null;
  result: {
    status: number;
    code: string;
    message: string;
  };
}
