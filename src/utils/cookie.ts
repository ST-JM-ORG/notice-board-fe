import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const getCookies = (key: string): string | undefined | null => {
  return cookie.get(key);
};

export const setCookie = (key: string, value: string): void => {
  cookie.set(key, value);
};