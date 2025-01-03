import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ERROR_RESPONSE } from "@/constants/const";

import { ApiResponse } from "@/models/api-response";
import { SingleUserType } from "@/models/user-response";

import instance from "@/utils/instance";

export const getUser = createAsyncThunk<
  ApiResponse<SingleUserType>,
  null,
  { rejectValue: ApiResponse }
>("user/me", async (_, thunkAPI) => {
  try {
    const response = await instance.get("/user/me");
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    } else {
      return thunkAPI.rejectWithValue(ERROR_RESPONSE);
    }
  }
});

export const updateUser = createAsyncThunk<
  ApiResponse<boolean>,
  { formData: FormData },
  { rejectValue: ApiResponse }
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
      return thunkAPI.rejectWithValue(ERROR_RESPONSE);
    }
  }
});

export const updatePw = createAsyncThunk<
  ApiResponse<boolean>,
  { currPw: string; newPw: string },
  { rejectValue: ApiResponse }
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
      return thunkAPI.rejectWithValue(ERROR_RESPONSE);
    }
  }
});

export const deleteUser = createAsyncThunk<
  ApiResponse<boolean>,
  null,
  { rejectValue: ApiResponse }
>("user/delete", async (_, thunkAPI) => {
  try {
    const response = await instance.delete("/user/me");
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    } else {
      return thunkAPI.rejectWithValue(ERROR_RESPONSE);
    }
  }
});
