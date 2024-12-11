"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

import { useRouter } from "next/navigation";

import Input from "@/components/input";
import { EmailRegex, PwRegex } from "@/constants/regex";

interface SignUpForm {
  email: string;
  pw: string;
  pwConfirm: string;
  name: string;
}

const Page = () => {
  const router = useRouter();

  const { control, handleSubmit, getValues, watch } = useForm<SignUpForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      pw: "",
      pwConfirm: "",
      name: "",
    },
  });

  const handleSignUp = () => {
    console.log(getValues("email"));
  };

  const handleRouteSignUp = () => {
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div
        className="w-full min-w-500 space-y-2 rounded-20 border-1 bg-anti-flash-white px-20 py-50
          shadow-lg"
      >
        <p className="mb-10 text-center text-25 font-bold">SIGN UP</p>
        <div className="flex space-x-1">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "이메일을 입력해주세요",
              pattern: {
                value: EmailRegex,
                message: "이메일 형식을 맞춰주세요",
              },
              minLength: {
                value: 1,
                message: "최소 1글자 이상 입력해주세요",
              },
            }}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Input
                type="text"
                className="w-full rounded-b-none"
                text="이메일"
                helperText={fieldState.error && fieldState.error.message}
                {...field}
              />
            )}
          />

          <button
            className="h-54 w-100 rounded-10 border-1 bg-silver-sand transition-colors duration-100
              ease-in-out hover:bg-gainsboro"
          >
            중복체크
          </button>
        </div>

        <Controller
          name="pw"
          control={control}
          rules={{
            required: "비밀번호를 입력해주세요",
            pattern: {
              value: PwRegex,
              message: "비밀번호 형식을 맞춰주세요",
            },
            minLength: {
              value: 1,
              message: "최소 1글자 이상 입력해주세요",
            },
            maxLength: {
              value: 20,
              message: "비밀번호는 최대 20글자까지 입력할 수 있습니다",
            },
            validate: (value) =>
              value === watch("pwConfirm") || "비밀번호가 일치하지 않습니다",
          }}
          defaultValue=""
          render={({ field, fieldState }) => (
            <Input
              type="password"
              className="rounded-t-none"
              text="비밀번호"
              helperText={fieldState.error && fieldState.error.message}
              {...field}
            />
          )}
        />

        <Controller
          name="pwConfirm"
          control={control}
          rules={{
            required: "비밀번호 확인을 입력해주세요",
            pattern: {
              value: PwRegex,
              message: "비밀번호 형식을 맞춰주세요",
            },
            minLength: {
              value: 1,
              message: "최소 1글자 이상 입력해주세요",
            },
            maxLength: {
              value: 20,
              message: "비밀번호 확인은 최대 20글자까지 입력할 수 있습니다",
            },
            validate: (value) =>
              value === watch("pw") || "비밀번호가 일치하지 않습니다",
          }}
          defaultValue=""
          render={({ field, fieldState }) => (
            <Input
              type="password"
              className="rounded-t-none"
              text="비밀번호 확인"
              helperText={fieldState.error && fieldState.error.message}
              {...field}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          rules={{
            required: "이름을 입력해주세요",
            minLength: {
              value: 1,
              message: "최소 1글자 이상 입력해주세요",
            },
          }}
          defaultValue=""
          render={({ field, fieldState }) => (
            <Input
              type="text"
              className="rounded-t-none"
              text="이름"
              helperText={fieldState.error && fieldState.error.message}
              {...field}
            />
          )}
        />

        <button className="w-full rounded-10 bg-baby-blue-eyes py-10 text-20">
          회원가입
        </button>
        <div className="flex items-center justify-center space-x-2">
          <span>이미 계정이 있으신가요?</span>
          <button className="flex items-center" onClick={handleRouteSignUp}>
            <span>로그인하러가기</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Page;
