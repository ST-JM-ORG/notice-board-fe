import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ERROR_RESPONSE, REFRESH_TOKEN } from "@constants/const";

import { ApiResponse } from "@models/api-response";

import { getCookie } from "@utils/cookie";
import instance from "@utils/instance";

export const signUp = createAsyncThunk<
  ApiResponse<boolean>,
  { formData: FormData },
  { rejectValue: ApiResponse }
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
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    } else {
      return thunkAPI.rejectWithValue(ERROR_RESPONSE);
    }
  }
});

export const emailDupCheck = createAsyncThunk<
  ApiResponse<null>,
  { email: string },
  { rejectValue: ApiResponse }
>("auth/emailDupCheck", async (data, thunkAPI) => {
  const { email } = data;

  try {
    const response = await instance.get(`/auth/email-check?email=${email}`);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    } else {
      return thunkAPI.rejectWithValue(ERROR_RESPONSE);
    }
  }
});

export const login = createAsyncThunk<
  ApiResponse<{ accessToken: string; refreshToken: string }>,
  { email: string; pw: string },
  { rejectValue: ApiResponse }
>("auth/login", async ({ email, pw }, thunkAPI) => {
  try {
    const response = await instance.post("/auth/login", {
      email,
      password: pw,
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    } else {
      return thunkAPI.rejectWithValue(ERROR_RESPONSE);
    }
  }
});

export const logout = createAsyncThunk<
  ApiResponse<boolean | null | undefined>,
  null,
  { rejectValue: ApiResponse }
>("auth/logout", async (_, thunkAPI) => {
  const refreshToken = getCookie(REFRESH_TOKEN);

  try {
    const response = await instance.post("/auth/logout", null, {
      headers: {
        Refresh: refreshToken,
      },
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    } else {
      return thunkAPI.rejectWithValue(ERROR_RESPONSE);
    }
  }
});

export const reissueToken = createAsyncThunk<
  ApiResponse<{ accessToken: string; refreshToken: string }>,
  null,
  { rejectValue: ApiResponse }
>("auth/reissueToken", async (_, thunkAPI) => {
  const refreshToken = getCookie(REFRESH_TOKEN);

  try {
    const response = await instance.post(`/auth/reissue-token`, null, {
      headers: {
        Refresh: refreshToken,
      },
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    } else {
      return thunkAPI.rejectWithValue(ERROR_RESPONSE);
    }
  }
});
