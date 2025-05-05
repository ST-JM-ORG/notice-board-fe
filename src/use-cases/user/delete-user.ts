import { ApiResponse } from "@/src/entities/common/api-response";
import { UserApi } from "@/src/services/user-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<boolean>;
type Args = null;

export const deleteUser = createThunk<Returned, Args>(
  "user/delete",
  async () => {
    const res = await UserApi.deleteUser();
    return res.data;
  },
);
