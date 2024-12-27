import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ApiResponse } from "@models/api-response";
import { AxiosErrorType } from "@models/axios-error-type";
import { SingleUserType } from "@models/user-response";

import instance from "@utils/instance";

export const getUser = createAsyncThunk<
  ApiResponse<SingleUserType>,
  null,
  { rejectValue: AxiosErrorType }
>("user/me", async (data, thunkAPI) => {
  try {
    const response = await instance.get("/user/me");
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue({
        status: e.status ? e.status : 500,
        response: e.response.data,
      });
    } else {
      return thunkAPI.rejectWithValue({
        status: 500,
        response: {
          data: null,
          result: {
            status: 500,
            code: "ERR500",
            message: "서버에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
          },
        },
      });
    }
  }
});

export const updateUser = createAsyncThunk<
  ApiResponse<boolean>,
  { formData: FormData },
  { rejectValue: AxiosErrorType }
>("user/update", async ({ formData }, thunkAPI) => {
  try {
    const response = await instance.put("/user/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue({
        status: e.status ? e.status : 500,
        response: e.response.data,
      });
    } else {
      return thunkAPI.rejectWithValue({
        status: 500,
        response: {
          data: null,
          result: {
            status: 500,
            code: "ERR500",
            message: "서버에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
          },
        },
      });
    }
  }
});
