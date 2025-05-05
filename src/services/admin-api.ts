import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  AdminUserProps,
  AdminUserResponse,
} from "@/src/entities/models/admin-response";
import { ApiResponse } from "@/src/entities/models/api-response";
import { ERROR_RESPONSE } from "@/src/shared/constants/const";
import instance from "@/src/shared/utils/instance";
import { createUrlQueryStr } from "@/src/shared/utils/query";

/**
 * SearchType: ALL, EMAIL, NAME, CONTACT
 */
export const getAdminUserList = createAsyncThunk<
  ApiResponse<AdminUserResponse>,
  {
    pageSize?: number;
    pageNo: number;
    searchType?: string;
    searchTerm?: string;
  },
  { rejectValue: ApiResponse }
>(
  "admin/userList",
  async (
    { pageSize = 10, pageNo, searchType = "ALL", searchTerm = "" },
    { rejectWithValue },
  ) => {
    const query = createUrlQueryStr([
      { paramKey: "size", paramValue: pageSize },
      { paramKey: "page", paramValue: pageNo },
      { paramKey: "searchType", paramValue: searchType },
      { paramKey: "keyword", paramValue: searchTerm },
    ]);

    try {
      const response = await instance.get(`/admin/user${query}`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      } else {
        return rejectWithValue(ERROR_RESPONSE);
      }
    }
  },
);

export const getAdminUserDetail = createAsyncThunk<
  ApiResponse<AdminUserProps>,
  { id: string },
  { rejectValue: ApiResponse }
>("admin/userDetail", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await instance.get(`/admin/user/${id}`);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    } else {
      return rejectWithValue(ERROR_RESPONSE);
    }
  }
});

export const updateAdminUser = createAsyncThunk<
  ApiResponse,
  { id: string; formData: FormData },
  { rejectValue: ApiResponse }
>("admin/update", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await instance.put(`/admin/user/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    } else {
      return rejectWithValue(ERROR_RESPONSE);
    }
  }
});

export const deleteAdminUser = createAsyncThunk<
  ApiResponse<boolean>,
  { id: string },
  { rejectValue: ApiResponse }
>("admin/delete", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await instance.delete(`/admin/user/${id}`);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    } else {
      return rejectWithValue(ERROR_RESPONSE);
    }
  }
});
