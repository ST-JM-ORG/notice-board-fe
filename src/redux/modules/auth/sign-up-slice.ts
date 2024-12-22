import {
  createSlice,
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

import { signUp } from "@redux/apis/auth-api";

import { removeCookie } from "@utils/cookie";

interface SignUpState {
  status: Status;
  code: SuccessType | ErrorType | null;
  message: string;
  error: string;
}

const initialState: SignUpState = {
  status: "idle",
  code: null,
  message: "",
  error: "",
};

const SignUpSlice = createSlice<
  SignUpState,
  SliceCaseReducers<SignUpState>,
  string,
  SliceSelectors<SignUpState>,
  string
>({
  name: "signUp",
  initialState,
  reducers: {
    resetSignUp: (state, action) => {
      state.status = "idle";
      state.code = null;
      state.message = "";
      state.error = "";
    },
    logout: (state, action) => {
      removeCookie(ACCESS_TOKEN);
      removeCookie(REFRESH_TOKEN);
      window.location.href = "/login";
      state.status = "idle";
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // 회원가입
    builder
      .addCase(signUp.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const {
          payload: {
            result: { status, code, message },
          },
        } = action;

        if (status === 200) {
          state.status = "fulfilled";
          state.code = SUCCESS_CODE[code];
          state.message = "회원가입되었습니다";
        } else if (status === 500) {
          state.status = "rejected";

          if (["E001", "E003", "E008"].includes(code)) {
            state.status = "rejected";
            state.code = ERROR_CODE[code];
            state.error = message;
          } else if (code === "E110") {
            state.status = "rejected";
            state.code = ERROR_CODE[code];
            state.error = message;
          }
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload
          ? action.payload.error
          : "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      });
  },
});

export const { resetSignUp } = SignUpSlice.actions;

export default SignUpSlice;
