import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ApiResponse } from "@/src/entities/common/api-response";
import { CategoryAPIResponse } from "@/src/entities/models/category-model";
import { ERROR_RESPONSE } from "@/src/shared/constants/const";
import instance from "@/src/shared/utils/instance";

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
