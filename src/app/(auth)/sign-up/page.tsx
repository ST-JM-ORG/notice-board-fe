"use client";

import React, { ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

import { useRouter } from "next/navigation";

import Input from "@components/input";
import ProfileUploader from "@components/profile-uploader";

import { EmailRegex, PwRegex } from "@constants/regex";

import { signUp } from "@redux/apis/auth-api";
import { useThunkDispatch } from "@redux/hook";

import { encodeFileToBase64 } from "@utils/file-encoder";

interface SignUpForm {
  email: string;
  pw: string;
  pwConfirm: string;
  name: string;
  phoneNumber: string;
  file?: string | null | undefined;
  fileName?: string | null | undefined;
  mime?: string | null | undefined;
}

const Page = () => {
  const router = useRouter();
  const thunkDispatch = useThunkDispatch();

  const { control, handleSubmit, getValues, setValue, watch } =
    useForm<SignUpForm>({
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        email: "",
        pw: "",
        pwConfirm: "",
        name: "",
        phoneNumber: "",
        file: null,
        fileName: null,
        mime: null,
      },
    });

  const handleRouteSignUp = () => {
    router.push("/login");
  };

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const file: File = e.target.files[0];
      const encodedFile = await encodeFileToBase64(file);

      if (typeof encodedFile === "string") {
        setValue("file", encodedFile);
        setValue("fileName", file.name);
        setValue("mime", file.type);
      }
    }
  };

  const handleSignUp = () => {
    const formData = new FormData();
    const file = getValues("file");

    formData.append("email", getValues("email"));
    formData.append("password", getValues("pw"));
    formData.append("name", getValues("name"));
    formData.append("contact", getValues("phoneNumber"));
    if (file) {
      formData.append("profileImg", file);
    }

    thunkDispatch(signUp({ formData }));
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-2">
        <p className="mb-10 text-center text-25 font-bold">SIGN UP</p>

        <Controller
          name="file"
          control={control}
          render={({ field: { value } }) => (
            <div className="flex items-center justify-center">
              <ProfileUploader file={value} onChange={handleChangeFile} />
            </div>
          )}
        />

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
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                type="text"
                className="w-full rounded-b-none"
                text="이메일 *"
                helperText={error && error.message}
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
              value: 8,
              message: "비밀번호는 최소 8자리 이상 입력해주세요",
            },
            maxLength: {
              value: 20,
              message: "비밀번호는 최대 20글자까지 입력할 수 있습니다",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="password"
              className="rounded-t-none"
              text="비밀번호 *"
              helperText={error && error.message}
              {...field}
            />
          )}
        />

        <Controller
          name="pwConfirm"
          control={control}
          rules={{
            required: "비밀번호를 입력해주세요",
            pattern: {
              value: PwRegex,
              message: "비밀번호 형식을 맞춰주세요",
            },
            minLength: {
              value: 8,
              message: "비밀번호 확인은 최소 8자 이상 입력해주세요",
            },
            maxLength: {
              value: 20,
              message: "비밀번호 확인은 최대 20글자까지 입력할 수 있습니다",
            },
            validate: (value) =>
              value === watch("pw") || "비밀번호가 일치하지 않습니다",
          }}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <Input
              type="password"
              className="rounded-t-none"
              text="비밀번호 확인 *"
              helperText={error && error.message}
              {...field}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          rules={{
            required: "이름을 입력해주세요",
          }}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <Input
              type="text"
              className="rounded-t-none"
              text="이름 *"
              helperText={error && error.message}
              {...field}
            />
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="text"
              className="rounded-t-none"
              text="전화번호"
              helperText={error && error.message}
              {...field}
            />
          )}
        />

        <button className="w-full rounded-10 bg-baby-blue-eyes py-10 text-20">
          회원가입
        </button>
      </form>

      <div className="mt-8 flex items-center justify-center space-x-2">
        <span>이미 계정이 있으신가요?</span>
        <button className="flex items-center" onClick={handleRouteSignUp}>
          <span>로그인하러가기</span>
          <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default Page;
