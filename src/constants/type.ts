export type Status = "idle" | "pending" | "fulfilled" | "rejected";
export type SuccessType = "Success";

export type ErrorType =
  | "FailToFetch"
  | "DbError"
  | "ImageUploadError"
  | "RequiredInputError"
  | "InvalidValue"
  | "AlreadyUsedEmail"
  | "NotFound";

export const SUCCESS_CODE: {
  [key: string]: SuccessType;
} = {
  A000: "Success",
};

export const ERROR_CODE: {
  [key: string]: ErrorType;
} = {
  E000: "FailToFetch",
  E001: "DbError",
  E003: "ImageUploadError",
  E004: "RequiredInputError",
  E008: "InvalidValue",
  E110: "AlreadyUsedEmail",
  E404: "NotFound",
};

export const ERROR_CODE_MSG: { [key: string]: string } = {
  E001: "DB 에러 발생",
  E003: "이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.",
  E004: "필수값 미입력",
  E008: "비밀번호 형식을 맞춰주세요",
  E110: "이미 사용중인 이메일입니다",
  E404: "데이터가 없습니다",
};
