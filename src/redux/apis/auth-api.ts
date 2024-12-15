import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { ErrorType } from "@models/error-type";

import instance from "@redux/apis/instance";

export const signUp = createAsyncThunk<
  { ok: boolean },
  { formData: FormData },
  { rejectValue: ErrorType }
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
  Response,
  { email: string },
  { rejectValue: ErrorType }
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
