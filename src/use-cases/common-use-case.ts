import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ApiResponse } from "@/src/entities/common/api-response";
import { ERROR_RESPONSE } from "@/src/shared/constants/const";

export function createThunk<Returned, Args>(
  type: string,
  handler: (arg: Args) => Promise<Returned>,
) {
  return createAsyncThunk<Returned, Args, { rejectValue: ApiResponse }>(
    type,
    async (arg, { rejectWithValue }) => {
      try {
        return await handler(arg);
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          return rejectWithValue(e.response.data);
        } else {
          return rejectWithValue(ERROR_RESPONSE);
        }
      }
    },
  );
}
