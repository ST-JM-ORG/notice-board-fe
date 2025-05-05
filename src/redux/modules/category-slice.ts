import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

import { CategoryAPIResponse } from "@/src/entities/models/category-model";
import { getCategories } from "@/src/services/category-api";
import { ERROR_MESSAGE } from "@/src/shared/constants/error-code";
import { Status } from "@/src/shared/constants/type";

interface CategoryState {
  selectedCategoryName: string | null | undefined;
  get: {
    status: Status;
    message: string;
    error: string;
    categories: CategoryAPIResponse[];
  };
}

const initialState: CategoryState = {
  selectedCategoryName: null,
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
  reducers: {
    changeCategory: (state, { payload }: PayloadAction<string | undefined>) => {
      state.selectedCategoryName = payload;
    },
  },
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

        if (payload.data.length > 0) {
          state.selectedCategoryName = payload.data[0].categoryNm;
        }
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

export const { changeCategory } = CategorySlice.actions;

export default CategorySlice;
