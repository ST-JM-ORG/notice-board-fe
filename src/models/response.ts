export interface Response<T> {
  data: T | null;
  result: {
    status: number;
    code: string;
    message: string;
  };
}
