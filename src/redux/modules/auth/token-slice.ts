import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constants/const";
import { Status } from "@constants/type";

import { reissueToken } from "@redux/apis/auth-api";

import { getCookies, setCookie } from "@utils/cookie";
import { decodeAccessToken } from "@utils/token";

interface ReissueTokenState {
  status: Status;
  message: string;
  error: string;
  token: string | null | undefined;
  profileImg: string | null | undefined;
  username: string;
}

const initialState: ReissueTokenState = {
  status: "idle",
  message: "",
  error: "",
  token: "",
  profileImg: null,
  username: "",
};

const TokenSlice = createSlice<
  ReissueTokenState,
  SliceCaseReducers<ReissueTokenState>,
  string,
  SliceSelectors<ReissueTokenState>,
  string
>({
  name: "reissueToken",
  initialState,
  reducers: {
    getProfileImg: (state, action) => {
      const token = getCookies(ACCESS_TOKEN);
      state.token = token;

      if (token) {
        const decodedToken = decodeAccessToken();

        if (decodedToken) {
          state.profileImg = decodedToken.profileImg;
          state.username = decodedToken.name;
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
        state.status = "rejected";

        if (action.payload) {
          const {
            response: {
              result: { message },
            },
          } = action.payload;
          state.error = message;
        }
      });
  },
});

export const { getProfileImg } = TokenSlice.actions;

export default TokenSlice;
