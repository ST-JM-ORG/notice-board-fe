import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { ERROR_CODE, ErrorType, Status, SuccessType } from "@constants/type";

import { SingleUserType } from "@models/user-response";

import { getUser } from "@redux/apis/user-api";

interface GetUserState {
  status: Status;
  type: SuccessType | ErrorType | "InternalServerError" | null;
  message: string;
  error: string;
  user: SingleUserType | null;
  profileImg: string | null | undefined;
  username: string;
}

const initialState: GetUserState = {
  status: "idle",
  type: null,
  message: "",
  error: "",
  user: null,
  profileImg: null,
  username: "",
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
      state.type = null;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = "pending";
        state.type = null;
        state.message = "";
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const {
          payload: {
            data,
            result: { message },
          },
        } = action;

        state.status = "fulfilled";
        state.message = message;
        state.user = data;
      })
      .addCase(getUser.rejected, (state, action) => {
        if (action.payload) {
          const {
            response: {
              result: { code, message },
            },
          } = action.payload;

          if (["E102", "E000"].includes(code)) {
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

export default GetUserSlice;
