"use client";

import React, { ChangeEvent, use, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Button from "@/components/button";
import Input from "@/components/input";
import ProfileUploader from "@/components/profile-uploader";

import { profileImgWhiteList } from "@/constants/mime";

import { updateUser } from "@/redux/apis/user-api";
import { useThunkDispatch } from "@/redux/hook";

import { encodeFileToBase64 } from "@/utils/file-encoder";

interface Props {
  params: Promise<{ id: string }>;
}

interface UserDetailForm {
  email: string;
  name: string;
  phoneNumber: string;
  originFile: File | null;
  file?: string | null | undefined;
  fileName?: string | null | undefined;
  mime?: string | null | undefined;
}

export default function Page(props: Props) {
  const { params } = props;

  const { control, handleSubmit, getValues, setValue, setError, clearErrors } =
    useForm<UserDetailForm>({
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        email: "",
        name: "",
        phoneNumber: "",
        originFile: null,
        file: null,
        fileName: null,
        mime: null, //  jpg, jpeg, png, gif, bmp
      },
    });

  const { id } = use(params);
  const dispatch = useThunkDispatch();

  const [defaultImg, setDefaultImg] = useState<string>("");

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
            setValue("originFile", file);
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

  const handleChangeUserInfo = () => {
    const formData = new FormData();

    const file = getValues("originFile");
    if (file) {
      formData.append("profileImg", file);
    }
    formData.append("name", getValues("name"));
    formData.append("contact", getValues("phoneNumber"));
    formData.append("profileDelYn", file ? "false" : "true");

    // FormData의 key 확인
    for (const [key, value] of formData.entries()) {
      console.log(key + ": " + value);
    }

    dispatch(updateUser({ formData }));
  };

  return (
    <form onSubmit={handleSubmit(handleChangeUserInfo)} className="flex">
      <Controller
        name="file"
        control={control}
        render={({ field: { value }, fieldState: { error } }) => (
          <div className="flex flex-col items-center justify-center space-y-2">
            <ProfileUploader
              size={250}
              defaultImg={
                defaultImg
                  ? process.env.NEXT_PUBLIC_BASE_URL + defaultImg
                  : null
              }
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

      <div className="ml-20 flex w-full flex-col justify-start">
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
                disabled={true}
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

        <div className="flex justify-end">
          <Button>취소</Button>
          <Button>수정</Button>
        </div>
      </div>
    </form>
  );
}
