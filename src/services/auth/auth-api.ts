import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ApiResponse } from "@/src/entities/models/api-response";
import { ERROR_RESPONSE, REFRESH_TOKEN } from "@/src/shared/constants/const";
import { getCookie } from "@/src/shared/utils/cookie";
import instance from "@/src/shared/utils/instance";

export const AuthApi = {
  // 회원가입
  async signUp(data: FormData) {
    return await instance.post("/auth/sign-up", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // 이메일 중복체크
  async emailDupCheck({ email }: { email: string }) {
    return await instance.get(`/auth/email-check?email=${email}`);
  },

  // 로그인
  async login({ email, pw }: { email: string; pw: string }) {
    return await instance.post("/auth/login", {
      email,
      password: pw,
    });
  },
};

export const logout = createAsyncThunk<
  ApiResponse<boolean>,
  null,
  { rejectValue: ApiResponse }
>("auth/logout", async (_, { rejectWithValue }) => {
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
      return rejectWithValue(e.response.data);
    } else {
      return rejectWithValue(ERROR_RESPONSE);
    }
  }
});

export const reissueToken = createAsyncThunk<
  ApiResponse<{ accessToken: string; refreshToken: string }>,
  null,
  { rejectValue: ApiResponse }
>("auth/reissueToken", async (_, { rejectWithValue }) => {
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
      return rejectWithValue(e.response.data);
    } else {
      return rejectWithValue(ERROR_RESPONSE);
    }
  }
});
