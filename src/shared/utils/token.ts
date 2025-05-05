import { jwtDecode, JwtPayload } from "jwt-decode";

import { TokenPayload } from "@/src/entities/auth/token";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/src/shared/constants/const";
import { getCookie } from "@/src/shared/utils/cookie";

export const isAccessTokenExpired = () => {
  const accessToken = getCookie(ACCESS_TOKEN);
  if (!accessToken) {
    return true;
  }
  const decodedToken = jwtDecode<JwtPayload>(accessToken);
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp && decodedToken.exp < currentTime) {
    // 토큰이 만료된 경우
    return true;
  }
  return false;
};

export const isRefreshTokenExpired = () => {
  const accessToken = getCookie(REFRESH_TOKEN);
  if (!accessToken) {
    return true;
  }
  const decodedToken = jwtDecode<JwtPayload>(accessToken);
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp && decodedToken.exp < currentTime) {
    // 토큰이 만료된 경우
    return true;
  }
  return false;
};

export const decodeAccessToken = () => {
  const accessToken = getCookie(ACCESS_TOKEN);
  if (!accessToken) return null;
  return jwtDecode<TokenPayload>(accessToken);
};
