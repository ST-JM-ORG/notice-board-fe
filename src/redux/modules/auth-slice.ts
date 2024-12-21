import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { Status } from "@constants/type";

import { emailDupCheck, login, signUp } from "@redux/apis/auth-api";

import { setCookie } from "@utils/cookie";

// E001 요청 DB 처리 실패
// E003 이미지 업로드 실패
// E004 입력 필수 값 미입력
// E008 잘못된 입력값
// E110 사용중인 이메일

const ERROR_CODE: { [key: string]: string } = {
  E001: "DB 에러 발생",
  E003: "이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.",
  E008: "비밀번호 형식을 맞춰주세요",
  E110: "이미 사용중인 이메일입니다",
};

const DEFAULT_STATUS: Status = {
  status: "pending",
  message: "",
  error: "",
  code: "",
};

interface AuthState {
  signUp: Status;
  emailDupCheck: Status;
  login: Status;
  emailAvailable: boolean | null;
}

const initialState: AuthState = {
  signUp: DEFAULT_STATUS,
  emailDupCheck: DEFAULT_STATUS,
  login: DEFAULT_STATUS,
  emailAvailable: null,
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
    // 회원가입
    builder
      .addCase(signUp.pending, (state, action) => {
        state.signUp = {
          ...DEFAULT_STATUS,
          status: "pending",
        };
        state.emailDupCheck = DEFAULT_STATUS;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const {
          payload: {
            result: { status, code },
          },
        } = action;

        if (status === 200) {
          state.signUp.status = "fulfilled";
          state.signUp.message = "회원가입되었습니다";
        } else if (status === 500) {
          state.signUp.status = "rejected";

          if (["E001", "E003", "E008"].includes(code)) {
            state.signUp.status = "rejected";
            state.signUp.error = ERROR_CODE[code];
            state.signUp.code = code;
          } else if (code === "E110") {
            state.emailDupCheck.status = "rejected";
            state.emailDupCheck.error = ERROR_CODE[code];
            state.emailAvailable = false;
          }
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUp.status = "rejected";
        state.signUp.error = action.payload
          ? action.payload.error
          : "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      });

    // 이메일 중복체크
    builder
      .addCase(emailDupCheck.pending, (state, action) => {
        state.emailDupCheck.status = "pending";
        state.emailAvailable = null;
      })
      .addCase(emailDupCheck.fulfilled, (state, action) => {
        const {
          payload: {
            result: { status, code, message },
          },
        } = action;

        if (status === 200) {
          state.emailDupCheck.status = "fulfilled";
          state.emailDupCheck.message = "사용 가능한 이메일입니다";
          state.emailDupCheck.code = code;
          state.emailAvailable = true;
        } else if (status === 500) {
          if (code === "E110") {
            state.emailDupCheck.status = "rejected";
            state.emailAvailable = false;
            state.emailDupCheck.error = ERROR_CODE[code];
          } else {
            state.emailDupCheck.status = "rejected";
            state.emailAvailable = false;
            state.emailDupCheck.error = message;
          }
        }
      })
      .addCase(emailDupCheck.rejected, (state, action) => {
        state.emailDupCheck.status = "rejected";
        state.emailAvailable = false;
        state.emailDupCheck.error =
          action.payload?.error ||
          "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      });

    // 로그인
    builder
      .addCase(login.pending, (state, action) => {
        state.login.status = "pending";
        state.login.message = "로그인중입니다";
        state.login.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        const {
          payload: {
            data,
            result: { status, message },
          },
        } = action;

        if (status === 200) {
          state.login.status = "fulfilled";
          state.login.message = message;
          if (data) {
            setCookie("token", data.accessToken);
            setCookie("refresh", data.refreshToken);
          }
        } else if (status === 401 || status === 500) {
          state.login.status = "rejected";
          state.login.error = message;
        }
      })
      .addCase(login.rejected, (state, action) => {});
  },
});

export default AuthSlice;
