import { jwtDecode, JwtPayload } from "jwt-decode";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constants/const";

import { getCookies } from "@utils/cookie";

export const isAccessTokenExpired = () => {
  const accessToken = getCookies(ACCESS_TOKEN);
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
  const accessToken = getCookies(REFRESH_TOKEN);
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
