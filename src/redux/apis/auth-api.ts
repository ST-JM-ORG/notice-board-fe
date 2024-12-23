import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { ApiResponse } from "@models/api-response";
import { AxiosErrorType } from "@models/axios-error-type";

import instance from "@utils/instance";

export const signUp = createAsyncThunk<
  ApiResponse<null>,
  { formData: FormData },
  { rejectValue: AxiosErrorType }
>("auth/signUp", async (data, thunkAPI) => {
  const { formData } = data;

  try {
    const response = await instance.post("/auth/sign-up", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);

    if (axios.isAxiosError(e)) {
      const error = e as AxiosError;

      if (error.message === "Network Error") {
        return thunkAPI.rejectWithValue({
          error: "네트워크에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
      }
    } else {
      return thunkAPI.rejectWithValue({
        error: "알 수 없는 에러가 발생했습니다.",
      });
    }
  }
});

export const emailDupCheck = createAsyncThunk<
  ApiResponse<null>,
  { email: string },
  { rejectValue: AxiosErrorType }
>("auth/emailDupCheck", async (data, thunkAPI) => {
  const { email } = data;

  try {
    const response = await instance.get(`/auth/email-check?email=${email}`);
    return response.data;
  } catch (e) {
    console.error(e);

    if (axios.isAxiosError(e)) {
      const error = e as AxiosError;

      if (error.message === "Network Error") {
        return thunkAPI.rejectWithValue({
          error: "네트워크에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
      }
    } else {
      return thunkAPI.rejectWithValue({
        error: "알 수 없는 에러가 발생했습니다.",
      });
    }
  }
});

export const login = createAsyncThunk<
  ApiResponse<{ accessToken: string; refreshToken: string }>,
  { email: string; pw: string },
  { rejectValue: AxiosErrorType }
>("auth/login", async ({ email, pw }, thunkAPI) => {
  try {
    const response = await instance.post(`/auth/login`, {
      email,
      password: pw,
    });
    return response.data;
  } catch (e) {
    console.error(e);

    if (axios.isAxiosError(e)) {
      const error = e as AxiosError;

      if (error.message === "Network Error") {
        return thunkAPI.rejectWithValue({
          error: "네트워크에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
      }
    } else {
      return thunkAPI.rejectWithValue({
        error: "알 수 없는 에러가 발생했습니다.",
      });
    }
  }
});
