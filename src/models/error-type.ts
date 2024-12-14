import { AxiosError } from "axios";

export type AxiosErrorType = AxiosError<{
  error: string;
}>;

export type ErrorType = { error: string };
