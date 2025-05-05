import { REFRESH_TOKEN } from "@/src/shared/constants/const";
import { getCookie } from "@/src/shared/utils/cookie";
import instance from "@/src/shared/utils/instance";

export const AuthApi = {
  // 회원가입
  async signUp(data: FormData) {
    return await instance.post("/auth/sign-up", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // 이메일 중복체크
  async emailDupCheck({ email }: { email: string }) {
    return await instance.get(`/auth/email-check?email=${email}`);
  },

  // 로그인
  async login({ email, pw }: { email: string; pw: string }) {
    return await instance.post("/auth/login", {
      email,
      password: pw,
    });
  },

  // 로그아웃
  async logout() {
    const refreshToken = getCookie(REFRESH_TOKEN);

    return await instance.post("/auth/logout", null, {
      headers: {
        Refresh: refreshToken,
      },
    });
  },

  // 토큰 재발급
  async reissueToken() {
    const refreshToken = getCookie(REFRESH_TOKEN);

    return await instance.post(`/auth/reissue-token`, null, {
      headers: {
        Refresh: refreshToken,
      },
    });
  },
};
