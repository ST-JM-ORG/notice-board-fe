import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { ERROR_MESSAGE } from "@/constants/error-code";
import { Status } from "@/constants/type";

import { CategoryItem } from "@/models/category-model";

import { getCategories } from "@/redux/apis/category-api";

interface CategoryState {
  get: {
    status: Status;
    message: string;
    error: string;
    categories: CategoryItem[];
  };
}

const initialState: CategoryState = {
  get: {
    status: "idle",
    message: "",
    error: "",
    categories: [],
  },
};

const CategorySlice = createSlice<
  CategoryState,
  SliceCaseReducers<CategoryState>,
  string,
  SliceSelectors<CategoryState>,
  string
>({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, _) => {
        state.get = {
          ...state.get,
          status: "pending",
          message: "",
          error: "",
        };
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.get = {
          ...state.get,
          status: "fulfilled",
          message: payload.result.message,
          categories: payload.data,
        };
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.get = {
          ...state.get,
          status: "rejected",
          error: payload?.result.message || ERROR_MESSAGE["E500"],
        };
      });
  },
});

export default CategorySlice;
