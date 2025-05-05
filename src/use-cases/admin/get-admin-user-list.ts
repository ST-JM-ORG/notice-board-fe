import { ApiResponse } from "@/src/entities/common/api-response";
import { AdminUserResponse } from "@/src/entities/models/admin-response";
import { AdminApi } from "@/src/services/admin-api";
import { createUrlQueryStr } from "@/src/shared/utils/query";
import { createThunk } from "@/src/use-cases/common-use-case";

type Returned = ApiResponse<AdminUserResponse>;
type Args = {
  pageSize?: number;
  pageNo: number;
  searchType?: string;
  searchTerm?: string;
};

export const getAdminUserList = createThunk<Returned, Args>(
  "admin/userList",
  async ({ pageSize = 10, pageNo, searchType = "ALL", searchTerm = "" }) => {
    const query = createUrlQueryStr([
      { paramKey: "size", paramValue: pageSize },
      { paramKey: "page", paramValue: pageNo },
      { paramKey: "searchType", paramValue: searchType },
      { paramKey: "keyword", paramValue: searchTerm },
    ]);

    const res = await AdminApi.getAdminUserList(query);
    return res.data;
  },
);
