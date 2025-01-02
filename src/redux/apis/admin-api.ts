import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ERROR_RESPONSE } from "@constants/const";

import { AdminUserResponse } from "@models/admin-response";
import { ApiResponse } from "@models/api-response";

import instance from "@utils/instance";
import { createUrlQueryStr } from "@utils/query";

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
    thunkAPI,
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
        return thunkAPI.rejectWithValue(e.response.data);
      } else {
        return thunkAPI.rejectWithValue(ERROR_RESPONSE);
      }
    }
  },
);
