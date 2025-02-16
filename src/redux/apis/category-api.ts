import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ERROR_RESPONSE } from "@/constants/const";

import { ApiResponse } from "@/models/api-response";
import { CategoryAPIResponse } from "@/models/category-model";

import instance from "@/utils/instance";

export const getCategories = createAsyncThunk<
  ApiResponse<CategoryAPIResponse[]>,
  undefined,
  { rejectValue: ApiResponse }
>("category/list", async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get("/admin/category");
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    } else {
      return rejectWithValue(ERROR_RESPONSE);
    }
  }
});
