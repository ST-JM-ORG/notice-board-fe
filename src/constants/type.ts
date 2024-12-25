export enum SuccessType {
  SUCCESS = "success",
}

export enum ErrorType {
  DB_ERROR = "DB_ERROR",
  IMAGE_UPLOAD_ERROR = "IMAGE_UPLOAD_ERROR",
  REQUIRED_INPUT_ERROR = "REQUIRED_INPUT_ERROR",
  INVALID_VALUE = "INVALID_VALUE",
  ALREADY_USED_EMAIL = "ALREADY_USED_EMAIL",
  NOT_FOUND = "NOT_FOUND",
}

export type Status = "idle" | "pending" | "fulfilled" | "rejected";

export const SUCCESS_CODE: {
  [key: string]: SuccessType;
} = {
  A000: SuccessType.SUCCESS,
};

export const ERROR_CODE: {
  [key: string]: ErrorType;
} = {
  E001: ErrorType.DB_ERROR,
  E003: ErrorType.IMAGE_UPLOAD_ERROR,
  E004: ErrorType.REQUIRED_INPUT_ERROR,
  E008: ErrorType.INVALID_VALUE,
  E110: ErrorType.ALREADY_USED_EMAIL,
  E404: ErrorType.NOT_FOUND,
};

export const ERROR_CODE_MSG: { [key: string]: string } = {
  E001: "DB 에러 발생",
  E003: "이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.",
  E004: "필수값 미입력",
  E008: "비밀번호 형식을 맞춰주세요",
  E110: "이미 사용중인 이메일입니다",
  E404: "데이터가 없습니다",
};
