import { ApiResponse } from "@/src/entities/common/api-response";
import { AdminApi } from "@/src/services/admin-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<boolean>;
type Args = { id: string };

export const deleteAdminUser = createThunk<Returned, Args>(
  "admin/delete",
  async (input) => {
    const res = await AdminApi.deleteAdminUser(input);
    return res.data;
  },
);
