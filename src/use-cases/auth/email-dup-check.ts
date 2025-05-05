import { ApiResponse } from "@/src/entities/models/api-response";
import { AuthApi } from "@/src/services/auth/auth-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<null>;
type Args = { email: string };

export const emailDupCheck = createThunk<Returned, Args>(
  "auth/emailDupCheck",
  async (data) => {
    const res = await AuthApi.emailDupCheck(data);
    return res.data;
  },
);
