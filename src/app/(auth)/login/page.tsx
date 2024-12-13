"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

import { useRouter } from "next/navigation";

import Input from "@components/input";

interface LoginForm {
  email: string;
  pw: string;
}

const Page = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<LoginForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      pw: "",
    },
  });

  const handleRouteSignUp = () => {
    router.push("/sign-up");
  };

  const handleLogin = () => {};

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-2">
        <p className="mb-10 text-center text-25 font-bold">LOGIN</p>

        <Controller
          name="email"
          control={control}
          rules={{
            required: "이메일을 입력해주세요",
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="text"
              className="rounded-b-none"
              text="이메일"
              helperText={error && error.message}
              {...field}
            />
          )}
        />

        <Controller
          name="pw"
          control={control}
          rules={{
            required: "비밀번호를 입력해주세요",
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

        <div className="flex justify-between">
          <div className="space-x-1">
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox">아이디 저장</label>
          </div>
          <div className="text-gray-500 underline hover:cursor-pointer">
            비밀번호 찾기
          </div>
        </div>
        <button className="w-full rounded-10 bg-baby-blue-eyes py-10 text-20">
          로그인
        </button>
      </form>
      <div className="mt-8 flex items-center justify-center space-x-2">
        <span>계정이 없으신가요?</span>
        <button
          className="flex items-center justify-center"
          onClick={handleRouteSignUp}
        >
          <span>회원가입하러가기</span>
          <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default Page;
