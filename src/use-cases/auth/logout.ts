import { ApiResponse } from "@/src/entities/common/api-response";
import { AuthApi } from "@/src/services/auth-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<boolean>;
type Args = null;

export const logout = createThunk<Returned, Args>("auth/logout", async () => {
  const res = await AuthApi.logout();
  return res.data;
});
