import { FormDataModel } from "@/src/entities/common/form-data-model";
import { ApiResponse } from "@/src/entities/models/api-response";
import { AuthApi } from "@/src/services/auth/auth-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<boolean>;
type Args = FormDataModel<FormData>;

export const signUp = createThunk<Returned, Args>(
  "auth/signUp",
  async (data) => {
    const { formData } = data;
    const res = await AuthApi.signUp(formData);
    return res.data;
  },
);
