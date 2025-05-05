import { ApiResponse } from "@/src/entities/common/api-response";
import { UserApi } from "@/src/services/user-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<boolean>;
type Args = { formData: FormData };

export const updateUser = createThunk<Returned, Args>(
  "user/update",
  async (input) => {
    const { formData } = input;
    const res = await UserApi.updateUser(formData);
    return res.data;
  },
);
