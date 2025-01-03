import { createSlice, PayloadAction, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";

import { ERROR_MESSAGE } from "@/constants/error-code";
import { Status } from "@/constants/type";

import { AdminUserProps } from "@/models/admin-response";

import { getAdminUserList } from "@/redux/apis/admin-api";

type ResetProps = "getList";

interface AdminState {
  getAdminUser: {
    status: Status;
    message: string;
    error: string;
    code: string;
    adminUser: AdminUserProps[];
    totalCount: number;
    pageSize: number;
    pageNo: number;
  };
}

const initialState: AdminState = {
  getAdminUser: {
    status: "idle",
    message: "",
    error: "",
    code: "",
    adminUser: [],
    totalCount: 0,
    pageSize: 10,
    pageNo: 1,
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
          state.getAdminUser.status = "idle";
          state.getAdminUser.message = "";
          state.getAdminUser.error = "";
          state.getAdminUser.code = "";
          state.getAdminUser.adminUser = [];
          state.getAdminUser.totalCount = 0;
          state.getAdminUser.pageSize = 10;
          state.getAdminUser.pageNo = 1;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUserList.pending, (state, _) => {
        state.getAdminUser.status = "pending";
        state.getAdminUser.message = "";
        state.getAdminUser.error = "";
        state.getAdminUser.code = "";
        state.getAdminUser.adminUser = [];
        state.getAdminUser.totalCount = 0;
        state.getAdminUser.pageSize = 10;
        state.getAdminUser.pageNo = 1;
      })
      .addCase(getAdminUserList.fulfilled, (state, { payload }) => {
        const {
          data: { data, total, size, page },
          result: { code, message },
        } = payload;

        state.getAdminUser.status = "fulfilled";
        state.getAdminUser.message = message;
        state.getAdminUser.code = code;
        state.getAdminUser.adminUser = data;
        state.getAdminUser.totalCount = total;
        state.getAdminUser.pageSize = size;
        state.getAdminUser.pageNo = page;
      })
      .addCase(getAdminUserList.rejected, (state, { payload }) => {
        state.getAdminUser.status = "rejected";
        state.getAdminUser.message =
          payload?.result.message || ERROR_MESSAGE["E500"];
        state.getAdminUser.code = payload?.result.code || "E500";
      });
  },
});

export const { resetAdmin } = AdminSlice.actions;

export default AdminSlice;
