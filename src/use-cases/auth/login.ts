import { ApiResponse } from "@/src/entities/models/api-response";
import { AuthApi } from "@/src/services/auth/auth-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<{ accessToken: string; refreshToken: string }>;
type Args = { email: string; pw: string };

export const login = createThunk<Returned, Args>(
  "auth/login",
  async (input) => {
    const res = await AuthApi.login(input);
    return res.data;
  },
);
