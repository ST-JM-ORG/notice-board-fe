import { ApiResponse } from "@/src/entities/common/api-response";
import { AdminUserProps } from "@/src/entities/models/admin-response";
import { AdminApi } from "@/src/services/admin-api";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<AdminUserProps>;
type Args = { id: string };

export const getAdminUserDetail = createThunk<Returned, Args>(
  "admin/userDetail",
  async (input) => {
    const res = await AdminApi.getAdminUserDetail(input);
    return res.data;
  },
);
