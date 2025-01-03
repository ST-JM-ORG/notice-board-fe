import { createSlice, PayloadAction, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/const";
import { ERROR_MESSAGE } from "@/constants/error-code";
import { Status } from "@/constants/type";

import { emailDupCheck, login, logout, signUp } from "@/redux/apis/auth-api";

import { removeCookie, setCookie } from "@/utils/cookie";

type ResetProps = "login" | "signUp" | "emailDupCheck" | "logout";

interface AuthState {
  login: {
    status: Status;
    message: string;
    error: string;
  };
  logout: {
    status: Status;
    message: string;
    error: string;
  };
  signUp: {
    status: Status;
    message: string;
    error: string;
    errorTarget: string | null;
    code: string;
  };
  emailDupCheck: {
    status: Status;
    message: string;
    error: string;
    errorTarget: string | null;
    code: string;
  };
}

const initialState: AuthState = {
  login: {
    status: "idle",
    message: "",
    error: "",
  },
  logout: {
    status: "idle",
    message: "",
    error: "",
  },
  signUp: {
    status: "idle",
    message: "",
    error: "",
    errorTarget: null,
    code: "",
  },
  emailDupCheck: {
    status: "idle",
    message: "",
    error: "",
    errorTarget: null,
    code: "",
  },
};

const AuthSlice = createSlice<
  AuthState,
  SliceCaseReducers<AuthState>,
  string,
  SliceSelectors<AuthState>,
  string
>({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state, { payload }: PayloadAction<ResetProps>) => {
      switch (payload) {
        case "login":
          state.login.status = "idle";
          state.login.message = "";
          state.login.error = "";
          break;
        case "logout":
          state.logout.status = "idle";
          state.logout.message = "";
          state.logout.error = "";
          break;
        case "signUp":
          state.signUp.status = "idle";
          state.signUp.message = "";
          state.signUp.error = "";
          state.signUp.code = "";
          state.emailDupCheck.status = "idle";
          state.emailDupCheck.message = "";
          state.emailDupCheck.error = "";
          state.emailDupCheck.code = "";
      }
    },
  },
  extraReducers: (builder) => {
    // 로그인
    builder
      .addCase(login.pending, (state, _) => {
        state.login.status = "pending";
        state.login.message = "로그인중입니다";
        state.login.error = "";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const {
          data,
          result: { message },
        } = payload;

        state.login.status = "fulfilled";
        state.login.message = message;

        if (data) {
          setCookie(ACCESS_TOKEN, data.accessToken);
          setCookie(REFRESH_TOKEN, data.refreshToken);
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.login.status = "rejected";
        state.login.error = payload?.result.message || ERROR_MESSAGE["E500"];
      });

    // 로그아웃
    builder
      .addCase(logout.pending, (state, _) => {
        state.logout.status = "pending";
        state.logout.message = "";
        state.logout.error = "";
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.logout.status = "fulfilled";
        state.logout.message = payload.result.message;
        removeCookie(ACCESS_TOKEN);
        removeCookie(REFRESH_TOKEN);
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.logout.status = "rejected";
        removeCookie(ACCESS_TOKEN);
        removeCookie(REFRESH_TOKEN);

        if (payload) {
          state.logout.error = payload?.result.message;
        }
      });

    // 회원가입
    builder
      .addCase(signUp.pending, (state, _) => {
        state.signUp.status = "pending";
        state.signUp.message = "";
        state.signUp.error = "";
        state.signUp.errorTarget = null;
        state.signUp.code = "";
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        const {
          result: { code },
        } = payload;

        state.signUp.status = "fulfilled";
        state.signUp.code = code;
        state.signUp.message = "회원가입되었습니다";
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.signUp.status = "rejected";
        state.signUp.error = payload?.result.message || ERROR_MESSAGE["E500"];

        if (payload) {
          const {
            result: { code },
          } = payload;

          switch (code) {
            case "E003":
              // 이미지 업로드 오류
              state.signUp.errorTarget = "image";
              break;
            case "E008":
              // 비밀번호 오류
              state.signUp.errorTarget = "password";
              break;
            case "E110":
              // 이메일 오류 (이미 사용중인 이메일 등...)
              state.signUp.errorTarget = "email";
              break;
            default:
              break;
          }
        }
      });

    // 이메일 중복체크
    builder
      .addCase(emailDupCheck.pending, (state, _) => {
        state.emailDupCheck.status = "pending";
        state.emailDupCheck.message = "";
        state.emailDupCheck.error = "";
        state.emailDupCheck.errorTarget = "";
        state.emailDupCheck.code = "";
      })
      .addCase(emailDupCheck.fulfilled, (state, { payload }) => {
        const {
          result: { code, message },
        } = payload;

        state.emailDupCheck.status = "fulfilled";
        state.emailDupCheck.message = message;
        state.emailDupCheck.code = code;
      })
      .addCase(emailDupCheck.rejected, (state, { payload }) => {
        state.emailDupCheck.status = "rejected";
        state.emailDupCheck.error =
          payload?.result.message || ERROR_MESSAGE["E500"];

        if (payload) {
          state.emailDupCheck.errorTarget = payload.result.target;
        }
      });
  },
});

export const { resetAuth } = AuthSlice.actions;

export default AuthSlice;
