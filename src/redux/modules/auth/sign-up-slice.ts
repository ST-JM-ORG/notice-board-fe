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
  type: SuccessType | ErrorType | "InternalServerError" | null;
  message: string;
  error: string;
}

const initialState: SignUpState = {
  status: "idle",
  type: null,
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
      state.type = null;
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
            result: { code },
          },
        } = action;

        state.status = "fulfilled";
        state.type = SUCCESS_CODE[code];
        state.message = "회원가입되었습니다";
      })
      .addCase(signUp.rejected, (state, action) => {
        if (action.payload) {
          const {
            response: {
              result: { code, message },
            },
          } = action.payload;

          if (["E001", "E003", "E008", "E110"].includes(code)) {
            state.type = ERROR_CODE[code];
          } else {
            state.type = "InternalServerError";
          }
          state.status = "rejected";
          state.error = message;
        }
      });
  },
});

export const { resetSignUp } = SignUpSlice.actions;

export default SignUpSlice;
