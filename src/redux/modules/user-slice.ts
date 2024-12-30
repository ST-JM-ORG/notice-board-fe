import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { ERROR_CODE, ERROR_MESSAGE, ErrorType } from "@constants/error-code";
import { SUCCESS_CODE, SuccessType } from "@constants/success-code";
import { Status } from "@constants/type";

import { SingleUserType } from "@models/user-response";

import { getUser, updatePw, updateUser } from "@redux/apis/user-api";

interface UserState {
  getUser: {
    status: Status;
    message: string;
    error: string;
    type: SuccessType | ErrorType | "InternalServerError" | null;
    user: SingleUserType | null;
    profileImg: string | null | undefined;
    username: string;
  };
  updateUser: {
    status: Status;
    message: string;
    error: string;
    type: SuccessType | ErrorType | "InternalServerError" | null;
  };
  changePw: {
    status: Status;
    message: string;
    error: string;
    code: string;
  };
}

const initialState: UserState = {
  getUser: {
    status: "idle",
    message: "",
    error: "",
    type: null,
    user: null,
    profileImg: null,
    username: "",
  },
  updateUser: {
    status: "idle",
    message: "",
    error: "",
    type: null,
  },
  changePw: {
    status: "idle",
    message: "",
    error: "",
    code: "",
  },
};

const UserSlice = createSlice<
  UserState,
  SliceCaseReducers<UserState>,
  string,
  SliceSelectors<UserState>,
  string
>({
  name: "user",
  initialState,
  reducers: {
    resetUser: (
      state,
      action: PayloadAction<"getUser" | "updateUser" | "changePw">,
    ) => {
      switch (action.payload) {
        case "getUser":
          state.getUser.status = "idle";
          state.getUser.message = "";
          state.getUser.error = "";
          state.getUser.type = null;
          state.getUser.user = null;
          state.getUser.profileImg = null;
          state.getUser.username = "";
          break;
        case "updateUser":
          state.updateUser.status = "idle";
          state.updateUser.message = "";
          state.updateUser.error = "";
          state.updateUser.type = null;
          break;
        case "changePw":
          state.changePw.status = "idle";
          state.changePw.message = "";
          state.changePw.error = "";
          state.changePw.code = "";
          break;
      }
    },
  },
  extraReducers: (builder) => {
    // User 데이터 불러오기
    builder
      .addCase(getUser.pending, (state, action) => {
        state.getUser.status = "pending";
        state.getUser.type = null;
        state.getUser.message = "";
        state.getUser.error = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const {
          payload: {
            data,
            result: { message },
          },
        } = action;

        state.getUser.status = "fulfilled";
        state.getUser.message = message;
        state.getUser.user = data;
      })
      .addCase(getUser.rejected, (state, action) => {
        if (action.payload) {
          const {
            response: {
              result: { code, message },
            },
          } = action.payload;

          if (["E102", "E000"].includes(code)) {
            state.getUser.type = ERROR_CODE[code];
          } else {
            state.getUser.type = "InternalServerError";
          }
          state.getUser.status = "rejected";
          state.getUser.error = message;
        }
      });

    // User 수정
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.updateUser.status = "pending";
        state.updateUser.type = null;
        state.updateUser.message = "";
        state.updateUser.error = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const {
          data,
          result: { status, code, message },
        } = action.payload;

        if (data && status === 200) {
          state.updateUser.status = "fulfilled";
          state.updateUser.type = SUCCESS_CODE[code];
          state.updateUser.message = message;
        } else if (status === 500) {
          state.updateUser.status = "rejected";
          state.updateUser.type = ERROR_CODE[code];
          state.updateUser.error = message;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUser.status = "rejected";
      });

    // 비밀번호 수정
    builder
      .addCase(updatePw.pending, (state, action) => {
        state.changePw.status = "pending";
        state.changePw.message = "";
        state.changePw.error = "";
        state.changePw.code = "";
      })
      .addCase(updatePw.fulfilled, (state, action) => {
        const {
          result: { code, message },
        } = action.payload;

        state.changePw.status = "fulfilled";
        state.changePw.code = code;
        state.changePw.message = message;
      })
      .addCase(updatePw.rejected, (state, action) => {
        state.changePw.status = "rejected";

        if (action.payload?.result) {
          const { code, message } = action.payload.result;
          state.changePw.code = code;
          state.changePw.error = message;
        } else {
          state.changePw.error =
            action.payload?.result.message || ERROR_MESSAGE["E500"];
        }
      });
  },
});

export const { resetUser } = UserSlice.actions;

export default UserSlice;
