import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constants/const";
import { Status } from "@constants/type";

import { login } from "@redux/apis/auth-api";

import { setCookie } from "@utils/cookie";

interface LoginState {
  status: Status;
  message: string;
  error: string;
}

const initialState: LoginState = {
  status: "idle",
  message: "",
  error: "",
};

const LoginSlice = createSlice<
  LoginState,
  SliceCaseReducers<LoginState>,
  string,
  SliceSelectors<LoginState>,
  string
>({
  name: "login",
  initialState,
  reducers: {
    resetLogin: (state, action) => {
      state.status = "idle";
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // 로그인
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "pending";
        state.message = "로그인중입니다";
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        const {
          payload: {
            data,
            result: { message },
          },
        } = action;

        state.status = "fulfilled";
        state.message = message;
        if (data) {
          setCookie(ACCESS_TOKEN, data.accessToken);
          setCookie(REFRESH_TOKEN, data.refreshToken);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";

        if (action.payload) {
          state.error = action.payload.response.result.message;
        }
      });
  },
});

export const { resetLogin } = LoginSlice.actions;

export default LoginSlice;
