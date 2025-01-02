export const ACCESS_TOKEN = "token";

export const REFRESH_TOKEN = "refresh";

export const ERROR_RESPONSE = {
  data: null,
  result: {
    status: 500,
    code: "E500",
    message: "서버에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
    target: null,
  },
};
