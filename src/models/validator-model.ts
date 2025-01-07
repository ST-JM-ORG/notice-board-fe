import { IsOptional, Length, Matches, MinLength, ValidateIf } from "class-validator";

import { EmailRegex, PwRegex } from "@/constants/regex";

// 로그인
export class LoginForm {
  @MinLength(1, { message: "이메일을 입력해주세요" })
  email: string;

  @MinLength(1, { message: "비밀번호를 입력해주세요" })
  pw: string;
}

// 회원가입
export class SignUpForm {
  @Matches(EmailRegex, { message: "이메일 형식을 맞춰주세요" })
  @MinLength(1, { message: "이메일을 입력해주세요" })
  email: string;

  @Matches(PwRegex, { message: "비밀번호 형식을 맞춰주세요" })
  @Length(8, 20, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
  @MinLength(1, { message: "비밀번호를 입력해주세요" })
  pw: string;

  @ValidateIf((value) => value.pw === value.pwConfirm, {
    message: "비밀번호가 일치하지 않습니다",
  })
  @Matches(PwRegex, { message: "비밀번호 형식을 맞춰주세요" })
  @Length(8, 20, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
  @MinLength(1, { message: "비밀번호를 입력해주세요" })
  pwConfirm: string;

  @MinLength(1, { message: "이름을 입력해주세요" })
  name: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  originFile: File | null;

  @IsOptional()
  file: string | null | undefined;

  @IsOptional()
  fileName: string | null | undefined;

  @IsOptional()
  mime: string | null | undefined;
}

// 사용자 수정
export class UserDetailForm {
  @Matches(EmailRegex, { message: "이메일 형식을 맞춰주세요" })
  email: string;

  @MinLength(1, { message: "이름을 입력해주세요" })
  name: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  originFile: File | undefined | null;

  @IsOptional()
  file: string | undefined | null;

  @IsOptional()
  fileName: string | undefined | null;

  @IsOptional()
  mime: string | undefined | null;
}

// 관리자 수정
export class AdminDetailForm {
  @Matches(EmailRegex, { message: "이메일 형식을 맞춰주세요" })
  email: string;

  @MinLength(1, { message: "이름을 입력해주세요" })
  name: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  file: string | undefined | null;

  @IsOptional()
  fileName: string | undefined | null;

  @IsOptional()
  mime: string | undefined | null;

  @IsOptional()
  isProfileDel: boolean;

  @IsOptional()
  permission: string | number;
}

// 비밀번호 변경
export class UpdatePwForm {
  @Matches(PwRegex, { message: "비밀번호 형식을 맞춰주세요" })
  @Length(8, 20, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
  @MinLength(1, { message: "비밀번호를 입력해주세요" })
  currPw: string;

  @Matches(PwRegex, { message: "비밀번호 형식을 맞춰주세요" })
  @Length(8, 20, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
  @MinLength(1, { message: "비밀번호를 입력해주세요" })
  newPw: string;

  @ValidateIf((value) => value.newPwConfirm === value.newPw, {
    message: "비밀번호가 일치하지 않습니다",
  })
  @Matches(PwRegex, { message: "비밀번호 형식을 맞춰주세요" })
  @Length(8, 20, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
  @MinLength(1, { message: "비밀번호를 입력해주세요" })
  newPwConfirm: string;
}
