import axios from "axios";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constants/const";

import { getCookie, setCookie } from "@utils/cookie";
import { isRefreshTokenExpired } from "@utils/token";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  responseType: "json",
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie(ACCESS_TOKEN);

    if (accessToken) {
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
    return response;
  },
  async (error) => {
    // 응답 200번대가 아닌 status일 때 응답 에러 직전 호출
    const originRequest = error.config;
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
        const newAccessToken = await reissueToken();

        if (!newAccessToken) {
          window.alert(
            "인증정보가 만료되었습니다. 다시 로그인 후 이용해주세요",
          );
          window.location.href = "/login";
          return Promise.reject(error);
        }

        originRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originRequest);
      }
    }
    return Promise.reject(error);
  },
);

const reissueToken = async () => {
  const refreshToken = getCookie(REFRESH_TOKEN);
  const isRefreshExpired: boolean = isRefreshTokenExpired();

  if (refreshToken && !isRefreshExpired) {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reissue-token`,
      null,
      {
        headers: { Refresh: refreshToken },
      },
    );

    if (result.data) {
      const newAccessToken: string = result.data.data.accessToken;
      const newRefreshToken: string = result.data.data.refreshToken;

      if (newAccessToken && refreshToken) {
        setCookie(ACCESS_TOKEN, newAccessToken);
        setCookie(REFRESH_TOKEN, newRefreshToken);
      }

      return newAccessToken;
    } else {
      return null;
    }
  }
  return null;
};

export default instance;
