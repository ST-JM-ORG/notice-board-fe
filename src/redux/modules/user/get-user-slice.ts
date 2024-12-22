import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { ErrorType, Status, SuccessType } from "@constants/type";

import { SingleUserType } from "@models/user-response";

import { getUser } from "@redux/apis/user-api";

interface GetUserState {
  status: Status;
  code: SuccessType | ErrorType | null;
  message: string;
  error: string;
  user: SingleUserType | null;
}

const initialState: GetUserState = {
  status: "idle",
  code: null,
  message: "",
  error: "",
  user: null,
};

const GetUserSlice = createSlice<
  GetUserState,
  SliceCaseReducers<GetUserState>,
  string,
  SliceSelectors<GetUserState>,
  string
>({
  name: "getUserSlice",
  initialState,
  reducers: {
    resetGetUser: (state, action) => {
      state.status = "idle";
      state.code = null;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = "pending";
        state.code = null;
        state.message = "";
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const {
          payload: {
            result: { status, message },
          },
        } = action;

        if (status >= 400) {
          state.status = "rejected";
          state.error = message;
        } else if (status >= 200) {
          state.status = "fulfilled";
          state.message = message;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error =
          action.payload?.error ||
          "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      });
  },
});

export default GetUserSlice;
