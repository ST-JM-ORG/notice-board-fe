import { ApiResponse } from "@/src/entities/common/api-response";
import { CategoryAPIResponse } from "@/src/entities/models/category-model";
import { CategoryApi } from "@/src/services/category-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<CategoryAPIResponse[]>;
type Args = undefined;

export const getCategories = createThunk<Returned, Args>(
  "category/list",
  async () => {
    const res = await CategoryApi.getCategories();
    return res.data;
  },
);
