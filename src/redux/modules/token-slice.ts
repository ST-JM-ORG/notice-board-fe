import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constants/const";
import { ERROR_MESSAGE } from "@constants/error-code";
import { Status } from "@constants/type";

import { reissueToken } from "@redux/apis/auth-api";

import { getCookie, setCookie } from "@utils/cookie";
import { decodeAccessToken } from "@utils/token";

interface TokenState {
  status: Status;
  message: string;
  error: string;
  token: string | null | undefined;
  profileImg: string | null | undefined;
  username: string;
  role: string;
}

const initialState: TokenState = {
  status: "idle",
  message: "",
  error: "",
  token: "",
  profileImg: null,
  username: "",
  role: "USER",
};

const TokenSlice = createSlice<
  TokenState,
  SliceCaseReducers<TokenState>,
  string,
  SliceSelectors<TokenState>,
  string
>({
  name: "token",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      const token = getCookie(ACCESS_TOKEN);
      state.token = token;

      if (token) {
        const decodedToken = decodeAccessToken();

        if (decodedToken) {
          state.profileImg = decodedToken.profileImg;
          state.username = decodedToken.name;
          state.role = decodedToken.role;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reissueToken.pending, (state, action) => {
        state.status = "pending";
        state.message = "";
        state.error = "";
      })
      .addCase(reissueToken.fulfilled, (state, action) => {
        const {
          data,
          result: { message },
        } = action.payload;

        state.status = "fulfilled";
        state.message = message;

        if (data) {
          state.token = data.accessToken;
          setCookie(ACCESS_TOKEN, data.accessToken);
          setCookie(REFRESH_TOKEN, data.refreshToken);
        }
      })
      .addCase(reissueToken.rejected, (state, action) => {
        const { payload } = action;

        state.status = "rejected";
        state.error = payload?.result.message || ERROR_MESSAGE["E500"];
      });
  },
});

export const { saveToken } = TokenSlice.actions;

export default TokenSlice;
