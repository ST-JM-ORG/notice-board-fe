import { createSlice, PayloadAction, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";

import { ERROR_CODE, ErrorType, Status, SUCCESS_CODE, SuccessType } from "@constants/type";

import { SingleUserType } from "@models/user-response";

import { changePw, getUser, updateUser } from "@redux/apis/user-api";

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
    resetUser: (state, action: PayloadAction<"getUser" | "updateUser">) => {
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
      .addCase(changePw.pending, (state, action) => {
        state.changePw.status = "pending";
        state.changePw.message = "";
        state.changePw.error = "";
      })
      .addCase(changePw.fulfilled, (state, action) => {
        state.changePw.status = "fulfilled";
        state.changePw.message = action.payload.result.message;
      })
      .addCase(changePw.rejected, (state, action) => {
        state.changePw.status = "rejected";
        state.changePw.error =
          action.payload?.result.message ||
          "서버에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.";
      });
  },
});

export const { resetUser } = UserSlice.actions;

export default UserSlice;
