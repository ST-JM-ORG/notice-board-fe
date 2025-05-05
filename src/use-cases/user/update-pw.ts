import { ApiResponse } from "@/src/entities/common/api-response";
import { UserApi } from "@/src/services/user-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<boolean>;
type Args = { currPw: string; newPw: string };

export const updatePw = createThunk<Returned, Args>(
  "/user/me/password",
  async (input) => {
    const res = await UserApi.updatePw(input);
    return res.data;
  },
);
