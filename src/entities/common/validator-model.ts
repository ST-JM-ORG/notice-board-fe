import { z } from "zod";

import { EmailRegex, PwRegex } from "@/src/shared/constants/regex";

// 로그인
export const LoginScheme = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요" }),
  pw: z.string().min(1, { message: "비밀번호를 입력해주세요" }),
});

export type LoginSchemeType = z.infer<typeof LoginScheme>;

// 회원가입
export const SignUpScheme = z
  .object({
    email: z
      .string()
      .min(1, { message: "이메일을 입력해주세요" })
      .regex(EmailRegex, { message: "이메일 형식을 맞춰주세요" }),
    pw: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요" })
      .min(8, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
      .max(20, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
      .regex(PwRegex, { message: "비밀번호 형식을 맞춰주세요" }),
    pwConfirm: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요" })
      .min(8, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
      .max(20, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
      .regex(PwRegex, { message: "비밀번호 형식을 맞춰주세요" }),
    name: z.string().min(1, { message: "이름을 입력해주세요" }),
    phoneNumber: z.string(),
    file: z.string().optional().nullable(),
    fileName: z.string().optional().nullable(),
    mime: z.string().optional().nullable(),
  })
  .refine(({ pw, pwConfirm }) => pw === pwConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["pw", "pwConfirm"],
  });

export type SignUpSchemeType = z.infer<typeof SignUpScheme>;

// 사용자 수정
export const UserDetailScheme = z.object({
  email: z.string().regex(EmailRegex, { message: "이메일 형식을 맞춰주세요" }),
  name: z.string().min(1, { message: "이름을 입력해주세요" }),
  phoneNumber: z.string().optional(),
  file: z.string().optional().nullable(),
  fileName: z.string().optional().nullable(),
  mime: z.string().optional().nullable(),
  isProfileDel: z.boolean(),
});

export type UserDetailSchemeType = z.infer<typeof UserDetailScheme>;

// 관리자 수정
export const AdminDetailScheme = z.object({
  email: z.string().regex(EmailRegex, { message: "이메일 형식을 맞춰주세요" }),
  name: z.string().min(1, { message: "이름을 입력해주세요" }),
  phoneNumber: z.string().optional(),
  file: z.string().optional().nullable(),
  fileName: z.string().optional().nullable(),
  mime: z.string().optional().nullable(),
  isProfileDel: z.boolean(),
  permission: z.number(),
});

export type AdminDetailSchemeType = z.infer<typeof AdminDetailScheme>;

// 비밀번호 변경
export const UpdatePwScheme = z
  .object({
    currPw: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요" })
      .max(20, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
      .regex(PwRegex, { message: "비밀번호 형식을 맞춰주세요" }),
    newPw: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요" })
      .max(20, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
      .regex(PwRegex, { message: "비밀번호 형식을 맞춰주세요" }),
    newPwConfirm: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요" })
      .max(20, { message: "비밀번호는 8~20 글자 사이로 입력해주세요" })
      .regex(PwRegex, { message: "비밀번호 형식을 맞춰주세요" }),
  })
  .refine(({ newPw, newPwConfirm }) => newPw === newPwConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["pw", "pwConfirm"],
  });

export type UpdatePwSchemeType = z.infer<typeof UpdatePwScheme>;
