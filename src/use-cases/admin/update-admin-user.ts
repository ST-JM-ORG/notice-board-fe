import { ApiResponse } from "@/src/entities/common/api-response";
import { AdminApi } from "@/src/services/admin-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse;
type Args = { id: string; formData: FormData };

export const updateAdminUser = createThunk<Returned, Args>(
  "admin/update",
  async (input) => {
    const res = await AdminApi.updateAdminUser(input);
    return res.data;
  },
);
