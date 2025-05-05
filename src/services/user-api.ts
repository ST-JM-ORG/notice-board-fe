import instance from "@/src/shared/utils/instance";

export const UserApi = {
  // 내 정보 불러오기
  async getMe() {
    return await instance.get("/user/me");
  },

  // 사용자 정보 수정
  async updateUser(data: FormData) {
    return await instance.put("/user/me", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // 비밀번호 변경
  async updatePw({ currPw, newPw }: { currPw: string; newPw: string }) {
    return await instance.put("/user/me/password", {
      currentPw: currPw,
      newPw,
    });
  },

  // 사용자 삭제
  async deleteUser() {
    return await instance.delete("/user/me");
  },
};
