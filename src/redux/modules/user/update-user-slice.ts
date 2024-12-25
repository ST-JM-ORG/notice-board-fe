import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import {
  ERROR_CODE,
  ErrorType,
  Status,
  SUCCESS_CODE,
  SuccessType,
} from "@constants/type";

import { updateUser } from "@redux/apis/user-api";

interface UpdateUserState {
  status: Status;
  code: SuccessType | ErrorType | null;
  message: string;
  error: string;
}

const initialState: UpdateUserState = {
  status: "idle",
  code: null,
  message: "",
  error: "",
};

const UpdateUserSlice = createSlice<
  UpdateUserState,
  SliceCaseReducers<UpdateUserState>,
  string,
  SliceSelectors<UpdateUserState>,
  string
>({
  name: "updateUserSlice",
  initialState,
  reducers: {
    resetUpdateUser: (state, action) => {
      state.status = "idle";
      state.code = null;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.status = "pending";
        state.code = null;
        state.message = "";
        state.error = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const {
          data,
          result: { status, code, message },
        } = action.payload;

        if (data && status === 200) {
          state.status = "fulfilled";
          state.code = SUCCESS_CODE[code];
          state.message = message;
        } else if (status === 500) {
          state.status = "rejected";
          state.code = ERROR_CODE[code];
          state.error = message;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { resetUpdateUser } = UpdateUserSlice.actions;

export default UpdateUserSlice;
