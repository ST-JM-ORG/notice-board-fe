import { ApiResponse } from "@/src/entities/common/api-response";
import { SingleUserType } from "@/src/entities/models/user-response";
import { UserApi } from "@/src/services/user-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<SingleUserType>;
type Args = null;

export const getMe = createThunk<Returned, Args>("user/me", async (input) => {
  const res = await UserApi.getMe();
  return res.data;
});
