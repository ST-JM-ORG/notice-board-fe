import { createSlice, PayloadAction, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";

import { ERROR_MESSAGE } from "@/constants/error-code";
import { Status } from "@/constants/type";

import { AdminUserProps } from "@/models/admin-response";

import { getAdminUserDetail, getAdminUserList, updateAdminUser } from "@/redux/apis/admin-api";

type ResetProps = "getList" | "update";

interface AdminState {
  userList: {
    status: Status;
    message: string;
    error: string;
    code: string;
    users: AdminUserProps[];
    totalCount: number;
    totalPageCount: number;
    pageSize: number;
    pageNo: number;
  };
  detail: {
    status: Status;
    message: string;
    error: string;
    code: string;
    user: AdminUserProps | null;
  };
  update: {
    status: Status;
    message: string;
    error: string;
    code: string;
  };
}

const initialState: AdminState = {
  userList: {
    status: "idle",
    message: "",
    error: "",
    code: "",
    users: [],
    totalCount: 0,
    totalPageCount: 0,
    pageSize: 10,
    pageNo: 1,
  },
  detail: {
    status: "idle",
    message: "",
    error: "",
    code: "",
    user: null,
  },
  update: {
    status: "idle",
    message: "",
    error: "",
    code: "",
  },
};

const AdminSlice = createSlice<
  AdminState,
  SliceCaseReducers<AdminState>,
  string,
  SliceSelectors<AdminState>,
  string
>({
  name: "admin",
  initialState,
  reducers: {
    resetAdmin: (state, { payload }: PayloadAction<ResetProps>) => {
      switch (payload) {
        case "getList":
          state.userList = {
            ...state.userList,
            status: "idle",
            message: "",
            error: "",
            code: "",
            totalCount: 0,
            totalPageCount: 0,
            pageSize: 10,
            pageNo: 1,
          };
          break;
        case "update":
          state.update = { status: "idle", message: "", error: "", code: "" };
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUserList.pending, (state, _) => {
        state.userList = {
          ...state.userList,
          status: "pending",
          message: "",
          error: "",
          code: "",
          totalCount: 0,
          totalPageCount: 0,
          pageSize: 10,
          pageNo: 1,
        };
      })
      .addCase(getAdminUserList.fulfilled, (state, { payload }) => {
        const {
          data: { data, total, size, page },
          result: { code, message },
        } = payload;

        state.userList = {
          ...state.userList,
          status: "fulfilled",
          message: message,
          code: code,
          users: [...data],
          totalCount: total,
          totalPageCount: Math.ceil(total / size),
          pageSize: size,
          pageNo: page,
        };
      })
      .addCase(getAdminUserList.rejected, (state, { payload }) => {
        state.userList = {
          ...state.userList,
          status: "rejected",
          message: payload?.result.message || ERROR_MESSAGE["E500"],
          code: payload?.result.code || "E500",
        };
      });

    // 상세조회
    builder
      .addCase(getAdminUserDetail.pending, (state, _) => {
        state.detail = {
          status: "pending",
          message: "",
          error: "",
          code: "",
          user: null,
        };
      })
      .addCase(getAdminUserDetail.fulfilled, (state, { payload }) => {
        const {
          data,
          result: { code, message },
        } = payload;

        state.detail = {
          ...state.detail,
          status: "fulfilled",
          message,
          code,
          user: data,
        };
      })
      .addCase(getAdminUserDetail.rejected, (state, { payload }) => {
        state.detail = {
          ...state.detail,
          status: "rejected",
          error: payload?.result.message || ERROR_MESSAGE["E500"],
          code: payload?.result.code || "E500",
        };
      });

    // 수정
    builder
      .addCase(updateAdminUser.pending, (state, _) => {
        state.update = {
          status: "pending",
          message: "",
          error: "",
          code: "",
        };
      })
      .addCase(updateAdminUser.fulfilled, (state, { payload }) => {
        const {
          result: { message, code },
        } = payload;

        state.update = { ...state.update, status: "fulfilled", message, code };
      })
      .addCase(updateAdminUser.rejected, (state, { payload }) => {
        state.update = {
          ...state.update,
          status: "rejected",
          error: payload?.result.message || ERROR_MESSAGE["E500"],
          code: payload?.result.code || "E500",
        };
      });
  },
});

export const { resetAdmin } = AdminSlice.actions;

export default AdminSlice;
