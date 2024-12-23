import { AxiosRequestConfig, AxiosResponse } from "axios";

import { ApiResponse } from "@models/api-response";

import instance from "@utils/instance";

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  return await instance.get(url, config);
};

export const Post = async <T>(
  url: string,
  data?: never,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  return await instance.post(url, data, config);
};
