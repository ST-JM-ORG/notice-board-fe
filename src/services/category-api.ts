import instance from "@/src/shared/utils/instance";

export const CategoryApi = {
  // 카테고리 조회
  async getCategories() {
    return await instance.get("/admin/category");
  },
};
