import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { signUp } from "@redux/apis/auth-api";

interface AuthState {
  signUpStatus: "pending" | "fulfilled" | "rejected";
  token: string;
  isLoggedIn: boolean;
  message: string;
  errorMessage: string;
}

const initialState: AuthState = {
  signUpStatus: "pending",
  token: "",
  isLoggedIn: false,
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
  },
});

export default AuthSlice;
