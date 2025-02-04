import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const getCookie = (key: string): string | undefined | null => {
  return cookie.get(key);
};

export const setCookie = (key: string, value: string): void => {
  cookie.set(key, value);
};

export const removeCookie = (key: string): void => {
  cookie.remove(key);
};
