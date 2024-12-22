import axios, { InternalAxiosRequestConfig } from "axios";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constants/const";

import { getCookies, setCookie } from "@utils/cookie";
import { isRefreshTokenExpired } from "@utils/token";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  useToken?: boolean;
}

const instance = axios.create({
  baseURL: "http://3.34.123.112:8080",
  timeout: 10000,
  responseType: "json",
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const accessToken = getCookies(ACCESS_TOKEN);

    if (config.useToken && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    config.headers = config.headers || {
      "Content-Type": "application/json",
    };

    return config;
  },
  (error) => {
    // 2. 요청 에러가 있는 작업 처리
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    // response.data.data(API response)가 null이 아닐 때 accessToken과 refreshToken이 response.data에 있는지 확인하고 있으면 쿠키에 저장
    if (response.data.data) {
      const accessToken: string | undefined | null =
        response.data.data.accessToken;
      const refreshToken: string | undefined | null =
        response.data.data.refreshToken;

      if (accessToken && refreshToken) {
        setCookie(ACCESS_TOKEN, accessToken);
        setCookie(REFRESH_TOKEN, refreshToken);
      }
    }

    return response;
  },
  (error) => {
    // 응답 200번대가 아닌 status일 때 응답 에러 직전 호출
    console.log(error);
    // E102: Authentication failed
    // E103: Access denied
    if (
      error.response &&
      error.response?.status === 401 &&
      error.response?.data.result.code === "E102"
    ) {
      const isRefreshExpired: boolean = isRefreshTokenExpired();

      if (isRefreshExpired) {
        window.alert("인증정보가 만료되었습니다. 다시 로그인 후 이용해주세요");
        window.location.href = "/login";
      } else {
        const refreshToken = getCookies(REFRESH_TOKEN);
        if (refreshToken) {
          return instance.post("/auth/reissue-token", null, {
            headers: { Refresh: refreshToken },
          });
        }
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
