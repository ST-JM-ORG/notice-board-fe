"use client";

import React, { ChangeEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";

import { useRouter } from "next/navigation";

import Button from "@components/button";
import Input from "@components/input";
import ProfileUploader from "@components/profile-uploader";

import { profileImgWhiteList } from "@constants/mime";
import { PwRegex } from "@constants/regex";

import useToastContext from "@hook/use-toast-context";

import { getUser } from "@redux/apis/user-api";
import { useAppSelector, useThunkDispatch } from "@redux/hook";

import { encodeFileToBase64 } from "@utils/file-encoder";

interface ProfileForm {
  email: string;
  pw: string;
  pwConfirm: string;
  name: string;
  phoneNumber: string;
  file?: string | null | undefined;
  fileName?: string | null | undefined;
  mime?: string | null | undefined;
}

export default function Page() {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm<ProfileForm>({
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
      mime: null, //  jpg, jpeg, png, gif, bmp
    },
  });

  const router = useRouter();
  const thunkDispatch = useThunkDispatch();
  const toast = useToastContext();

  const { status, message, error } = useAppSelector(
    (state) => ({
      status: state.getUser.status,
      message: state.getUser.message,
      error: state.getUser.error,
    }),
    shallowEqual,
  );

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const file: File = e.target.files[0];

      if (file) {
        if (!profileImgWhiteList.includes(file.type)) {
          setError("file", {
            message: "jpg, jpeg, png, gif, bmp 확장자만 허용됩니다.",
          });
        } else {
          clearErrors("file");
          const encodedFile = await encodeFileToBase64(file);
          if (typeof encodedFile === "string") {
            setValue("file", encodedFile);
            setValue("fileName", file.name);
            setValue("mime", file.type);
          }
        }
      }
    }
  };

  const handleRemoveProfile = () => {
    clearErrors("file");
    setValue("file", null);
    setValue("fileName", null);
    setValue("mime", null);
  };

  useEffect(() => {
    thunkDispatch(getUser(null));
  }, [thunkDispatch]);

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success({ heading: "Success", message });
    }

    if (status === "rejected") {
      toast.error({ heading: "Error", message: error });
    }
  }, [status]);

  return (
    <div
      className="mx-auto space-y-5 rounded-20 border-1 border-gainsboro bg-white px-40 py-40
        shadow-md backdrop-blur"
    >
      <h2 className="text-25 font-bold">프로필</h2>

      <div className="tablet:grid-cols-2 grid grid-cols-1">
        <Controller
          name="file"
          control={control}
          render={({ field: { value }, fieldState: { error } }) => (
            <div className="flex flex-col items-center justify-center space-y-2">
              <ProfileUploader
                size={250}
                file={value}
                onChange={handleChangeFile}
              />
              <div className="flex flex-col items-center justify-start space-y-1">
                <div className="space-x-1">
                  <Button type="button" onClick={() => {}}>
                    미리보기
                  </Button>
                  <Button
                    type="button"
                    className="text-red"
                    onClick={handleRemoveProfile}
                  >
                    삭제
                  </Button>
                </div>
                <p className="text-12 font-bold text-american-silver">
                  jpg, jpeg, png, gif, bmp만 허용됩니다.
                </p>
              </div>
              <p className="px-5 text-13 text-red">{error && error.message}</p>
            </div>
          )}
        />

        <div className="flex flex-col space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field: { value } }) => (
              <Input
                type="text"
                className="w-full rounded-b-none"
                text="이메일"
                required={true}
                value={value}
                onChange={() => {}}
              />
            )}
          />

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
                text="비밀번호"
                helperText={error && error.message}
                required={true}
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
            render={({ field, fieldState: { error } }) => (
              <Input
                type="password"
                className="rounded-t-none"
                text="비밀번호 확인"
                helperText={error && error.message}
                required={true}
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
            render={({ field, fieldState: { error } }) => (
              <Input
                type="text"
                className="rounded-t-none"
                text="이름"
                helperText={error && error.message}
                required={true}
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
        </div>
      </div>

      <div className="flex justify-end space-x-1">
        <Button onClick={() => router.push("/")}>취소</Button>
        <Button className="text-salem">변경</Button>
      </div>
    </div>
  );
}
