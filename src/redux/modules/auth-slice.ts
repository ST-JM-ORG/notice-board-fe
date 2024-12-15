import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { emailDupCheck, signUp } from "@redux/apis/auth-api";

interface AuthState {
  signUpStatus: "pending" | "fulfilled" | "rejected";
  emailDupCheckStatus: "pending" | "fulfilled" | "rejected";
  token: string;
  isLoggedIn: boolean;
  isEmailDup: boolean | null;
  message: string;
  errorMessage: string;
}

const initialState: AuthState = {
  signUpStatus: "fulfilled",
  emailDupCheckStatus: "fulfilled",
  token: "",
  isLoggedIn: false,
  isEmailDup: null,
  message: "",
  errorMessage: "",
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
  reducers: {},
  extraReducers: (builder) => {
    // 회원가입
    builder
      .addCase(signUp.pending, (state, action) => {
        state.signUpStatus = "pending";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUpStatus = "fulfilled";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpStatus = "rejected";
        state.errorMessage = action.payload
          ? action.payload.error
          : "알 수 없는 오류가 발생했습니다.";
      });

    // 이메일 중복체크
    builder
      .addCase(emailDupCheck.pending, (state, action) => {
        state.emailDupCheckStatus = "pending";
        state.isEmailDup = false;
      })
      .addCase(emailDupCheck.fulfilled, (state, action) => {
        state.emailDupCheckStatus = "fulfilled";
        state.isEmailDup = true;
      })
      .addCase(emailDupCheck.rejected, (state, action) => {
        state.emailDupCheckStatus = "rejected";
        state.isEmailDup = false;
      });
  },
});

export default AuthSlice;
