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

import { emailDupCheck } from "@redux/apis/auth-api";

interface EmailDupCheckState {
  status: Status;
  type: SuccessType | ErrorType | "InternalServerError" | null;
  message: string;
  error: string;
}

const initialState: EmailDupCheckState = {
  status: "idle",
  type: null,
  message: "",
  error: "",
};

const EmailDupCheckSlice = createSlice<
  EmailDupCheckState,
  SliceCaseReducers<EmailDupCheckState>,
  string,
  SliceSelectors<EmailDupCheckState>,
  string
>({
  name: "emailDupCheck",
  initialState,
  reducers: {
    resetEmailDupCheck: (state, action) => {
      state.status = "idle";
      state.type = null;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // 이메일 중복체크
    builder
      .addCase(emailDupCheck.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(emailDupCheck.fulfilled, (state, action) => {
        const {
          payload: {
            result: { status, code, message },
          },
        } = action;

        if (status === 200) {
          state.status = "fulfilled";
          state.type = SUCCESS_CODE[code];
          state.message = message;
        } else if (status === 500) {
          if (code === "E110") {
            state.status = "rejected";
            state.type = ERROR_CODE[code];
            state.error = message;
          } else {
            state.status = "rejected";
            state.type = ERROR_CODE[code];
            state.error = message;
          }
        }
      })
      .addCase(emailDupCheck.rejected, (state, action) => {
        state.status = "rejected";
        if (action.payload) {
          const {
            response: {
              result: { code, message },
            },
          } = action.payload;
          if (code === "E110") {
            state.type = ERROR_CODE[code];
          } else {
            state.type = "InternalServerError";
          }
          state.error = message;
        }
      });
  },
});

export const { resetEmailDupCheck } = EmailDupCheckSlice.actions;

export default EmailDupCheckSlice;
