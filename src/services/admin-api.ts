import instance from "@/src/shared/utils/instance";

/**
 * SearchType: ALL, EMAIL, NAME, CONTACT
 */
export const AdminApi = {
  // 관리자 리스트 조회
  async getAdminUserList(query: string) {
    return await instance.get(`/admin/user${query}`);
  },

  // 관리자 상세정보 조회
  async getAdminUserDetail({ id }: { id: string }) {
    return await instance.get(`/admin/user/${id}`);
  },

  // 관리자 업데이트
  async updateAdminUser({ id, formData }: { id: string; formData: FormData }) {
    return await instance.put(`/admin/user/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // 관리자 삭제
  async deleteAdminUser({ id }: { id: string }) {
    return await instance.delete(`/admin/user/${id}`);
  },
};
