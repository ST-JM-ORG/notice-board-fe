import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constants/const";
import { Status } from "@constants/type";

import { logout } from "@redux/apis/auth-api";

import { removeCookie } from "@utils/cookie";

interface LogoutState {
  status: Status;
  message: string;
  error: string;
}

const initialState: LogoutState = {
  status: "idle",
  message: "",
  error: "",
};

const LogoutSlice = createSlice<
  LogoutState,
  SliceCaseReducers<LogoutState>,
  string,
  SliceSelectors<LogoutState>,
  string
>({
  name: "logout",
  initialState,
  reducers: {
    resetLogout: (state, action) => {
      state.status = "idle";
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state, action) => {
        state.status = "pending";
        state.message = "";
        state.error = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.message = action.payload.result.message;
        removeCookie(ACCESS_TOKEN);
        removeCookie(REFRESH_TOKEN);
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "rejected";
        removeCookie(ACCESS_TOKEN);
        removeCookie(REFRESH_TOKEN);

        if (action.payload) {
          state.error = action.payload.response?.result.message;
        }
      });
  },
});

export const { resetLogout } = LogoutSlice.actions;

export default LogoutSlice;
