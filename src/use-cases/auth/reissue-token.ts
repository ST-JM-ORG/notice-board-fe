import { ApiResponse } from "@/src/entities/common/api-response";
import { AuthApi } from "@/src/services/auth-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<{ accessToken: string; refreshToken: string }>;
type Args = null;

export const reissueToken = createThunk<Returned, Args>(
  "auth/reissueToken",
  async () => {
    const res = await AuthApi.reissueToken();
    return res.data;
  },
);
