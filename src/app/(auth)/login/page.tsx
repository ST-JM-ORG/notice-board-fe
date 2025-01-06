"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { shallowEqual } from "react-redux";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

import { useRouter } from "next/navigation";

import Button from "@/components/button";
import Input from "@/components/input";

import useToastContext from "@/hook/use-toast-context";

import { LoginForm } from "@/models/validator-model";

import { login } from "@/redux/apis/auth-api";
import { useAppDispatch, useAppSelector, useThunkDispatch } from "@/redux/hook";
import { resetAuth } from "@/redux/modules/auth-slice";

import { cn } from "@/utils/classname";

const Page = () => {
  const { control, handleSubmit, getValues } = useForm<LoginForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: classValidatorResolver(LoginForm),
    defaultValues: {
      email: "",
      pw: "",
    },
  });

  const router = useRouter();
  const appDispatch = useAppDispatch();
  const dispatch = useThunkDispatch();
  const toast = useToastContext();

  const { status, message, error } = useAppSelector(
    (state) => ({
      status: state.auth.login.status,
      message: state.auth.login.message,
      error: state.auth.login.error,
    }),
    shallowEqual,
  );

  const handleRouteSignUp = () => {
    router.push("/sign-up");
  };

  const handleLogin = () => {
    const email = getValues("email");
    const pw = getValues("pw");

    dispatch(login({ email, pw }));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success({ heading: "Success", message: message });
      router.push("/");
    } else if (status === "rejected") {
      toast.error({ heading: "Error", message: error });
    }
  }, [status]);

  useEffect(() => {
    return () => {
      appDispatch(resetAuth("login"));
    };
  }, [appDispatch]);

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-2">
        <p className="mb-10 text-center text-25 font-bold">로그인</p>

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
          render={({ field, fieldState: { error } }) => (
            <Input
              type="password"
              className="rounded-t-none"
              text="비밀번호"
              helperText={error && error.message}
              {...field}
            />
          )}
        />

        <div className="flex justify-between">
          <div className="space-x-1">
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox">아이디 저장</label>
          </div>
          <div
            className={cn("text-gray-500 underline", "hover:cursor-pointer")}
          >
            비밀번호 찾기
          </div>
        </div>
        <Button
          className="w-full rounded-10 py-10 text-20"
          bgColor="bg-baby-blue-eyes"
          borderColor="border-dark-sky-blue"
        >
          로그인
        </Button>
      </form>

      <div className="mt-8 flex items-center justify-center space-x-2">
        <span>계정이 없으신가요?</span>
        <button
          className="flex items-center justify-center"
          onClick={handleRouteSignUp}
        >
          <span className="underline">회원가입하러가기</span>
          <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default Page;
