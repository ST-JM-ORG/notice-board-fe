import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ApiResponse } from "@models/api-response";
import { SingleUserType } from "@models/user-response";

import instance from "@utils/instance";

export const getUser = createAsyncThunk<
  ApiResponse<SingleUserType>,
  null,
  { rejectValue: ApiResponse<null | undefined> }
>("user/me", async (_, thunkAPI) => {
  try {
    const response = await instance.get("/user/me");
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    } else {
      return thunkAPI.rejectWithValue({
        data: null,
        result: {
          status: 500,
          code: "E500",
          message: "서버에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
        },
      });
    }
  }
});

export const updateUser = createAsyncThunk<
  ApiResponse<boolean>,
  { formData: FormData },
  { rejectValue: ApiResponse<null | undefined> }
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
      return thunkAPI.rejectWithValue(e.response.data);
    } else {
      return thunkAPI.rejectWithValue({
        data: null,
        result: {
          status: 500,
          code: "E500",
          message: "서버에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
        },
      });
    }
  }
});

export const updatePw = createAsyncThunk<
  ApiResponse<boolean>,
  { currPw: string; newPw: string },
  { rejectValue: ApiResponse<null | undefined> }
>("user/changePw", async ({ currPw, newPw }, thunkAPI) => {
  try {
    const response = await instance.put("/user/me/password", {
      currentPw: currPw,
      newPw,
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    } else {
      return thunkAPI.rejectWithValue({
        data: null,
        result: {
          status: 500,
          code: "E500",
          message: "서버에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
        },
      });
    }
  }
});

export const deleteUser = createAsyncThunk<
  ApiResponse<boolean>,
  null,
  { rejectValue: ApiResponse<null | undefined> }
>("user/delete", async (_, thunkAPI) => {
  try {
    const response = await instance.delete("/user/me");
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    } else {
      return thunkAPI.rejectWithValue({
        data: null,
        result: {
          status: 500,
          code: "E500",
          message: "서버에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
        },
      });
    }
  }
});
