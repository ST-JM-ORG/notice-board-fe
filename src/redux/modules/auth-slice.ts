import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constants/const";
import {
  ERROR_CODE,
  ErrorType,
  Status,
  SUCCESS_CODE,
  SuccessType,
} from "@constants/type";

import { emailDupCheck, login, logout, signUp } from "@redux/apis/auth-api";

import { removeCookie, setCookie } from "@utils/cookie";

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
    type: SuccessType | ErrorType | "InternalServerError" | null;
  };
  emailDupCheck: {
    status: Status;
    message: string;
    error: string;
    type: SuccessType | ErrorType | "InternalServerError" | null;
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
    type: null,
  },
  emailDupCheck: {
    status: "idle",
    message: "",
    error: "",
    type: null,
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
    resetAuth: (
      state,
      action: PayloadAction<"login" | "signUp" | "emailDupCheck" | "logout">,
    ) => {
      switch (action.payload) {
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
          state.signUp.type = null;
          state.emailDupCheck.status = "idle";
          state.emailDupCheck.message = "";
          state.emailDupCheck.error = "";
          state.emailDupCheck.type = null;
      }
    },
  },
  extraReducers: (builder) => {
    // 로그인
    builder
      .addCase(login.pending, (state, action) => {
        state.login.status = "pending";
        state.login.message = "로그인중입니다";
        state.login.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        const {
          payload: {
            data,
            result: { message },
          },
        } = action;

        state.login.status = "fulfilled";
        state.login.message = message;
        if (data) {
          setCookie(ACCESS_TOKEN, data.accessToken);
          setCookie(REFRESH_TOKEN, data.refreshToken);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.login.status = "rejected";

        if (action.payload) {
          state.login.error = action.payload.response.result.message;
        }
      });

    // 로그아웃
    builder
      .addCase(logout.pending, (state, action) => {
        state.logout.status = "pending";
        state.logout.message = "";
        state.logout.error = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logout.status = "fulfilled";
        state.logout.message = action.payload.result.message;
        removeCookie(ACCESS_TOKEN);
        removeCookie(REFRESH_TOKEN);
      })
      .addCase(logout.rejected, (state, action) => {
        state.logout.status = "rejected";
        removeCookie(ACCESS_TOKEN);
        removeCookie(REFRESH_TOKEN);

        if (action.payload) {
          state.logout.error = action.payload.response?.result.message;
        }
      });

    // 회원가입
    builder
      .addCase(signUp.pending, (state, action) => {
        state.signUp.status = "pending";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const {
          payload: {
            result: { code },
          },
        } = action;

        state.signUp.status = "fulfilled";
        state.signUp.type = SUCCESS_CODE[code];
        state.signUp.message = "회원가입되었습니다";
      })
      .addCase(signUp.rejected, (state, action) => {
        if (action.payload) {
          const {
            response: {
              result: { code, message },
            },
          } = action.payload;

          if (["E001", "E003", "E008", "E110"].includes(code)) {
            state.signUp.type = ERROR_CODE[code];
          } else {
            state.signUp.type = "InternalServerError";
          }
          state.signUp.status = "rejected";
          state.signUp.error = message;
        }
      });

    // 이메일 중복체크
    builder
      .addCase(emailDupCheck.pending, (state, action) => {
        state.emailDupCheck.status = "pending";
      })
      .addCase(emailDupCheck.fulfilled, (state, action) => {
        const {
          payload: {
            result: { status, code, message },
          },
        } = action;

        if (status === 200) {
          state.emailDupCheck.status = "fulfilled";
          state.emailDupCheck.type = SUCCESS_CODE[code];
          state.emailDupCheck.message = message;
        } else if (status === 500) {
          if (code === "E110") {
            state.emailDupCheck.status = "rejected";
            state.emailDupCheck.type = ERROR_CODE[code];
            state.emailDupCheck.error = message;
          } else {
            state.emailDupCheck.status = "rejected";
            state.emailDupCheck.type = ERROR_CODE[code];
            state.emailDupCheck.error = message;
          }
        }
      })
      .addCase(emailDupCheck.rejected, (state, action) => {
        state.emailDupCheck.status = "rejected";
        if (action.payload) {
          const {
            response: {
              result: { code, message },
            },
          } = action.payload;
          if (code === "E110") {
            state.emailDupCheck.type = ERROR_CODE[code];
          } else {
            state.emailDupCheck.type = "InternalServerError";
          }
          state.emailDupCheck.error = message;
        }
      });
  },
});

export const { resetAuth } = AuthSlice.actions;

export default AuthSlice;
