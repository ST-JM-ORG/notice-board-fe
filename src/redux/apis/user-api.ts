import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { ApiResponse } from "@models/api-response";
import { AxiosErrorType } from "@models/axios-error-type";
import { SingleUserType } from "@models/user-response";

import instance from "@redux/apis/instance";

export const getUser = createAsyncThunk<
  ApiResponse<SingleUserType>,
  null,
  { rejectValue: AxiosErrorType }
>("user/me", async (data, thunkAPI) => {
  try {
    const response = await instance.get("/user/me");
    return response.data;
  } catch (e) {
    console.error(e);

    if (axios.isAxiosError(e)) {
      const error = e as AxiosError;

      if (error.message === "Network Error") {
        return thunkAPI.rejectWithValue({
          error: "네트워크에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
      }
    } else {
      return thunkAPI.rejectWithValue({
        error: "알 수 없는 에러가 발생했습니다.",
      });
    }
  }
});
