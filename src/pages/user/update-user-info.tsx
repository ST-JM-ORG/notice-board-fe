import React, { ChangeEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";

import { useRouter } from "next/navigation";

import Button from "@components/button";
import Input from "@components/input";
import ProfileUploader from "@components/profile-uploader";

import { profileImgWhiteList } from "@constants/mime";

import useToastContext from "@hook/use-toast-context";

import { getUser } from "@redux/apis/user-api";
import { useAppSelector, useThunkDispatch } from "@redux/hook";

import { encodeFileToBase64 } from "@utils/file-encoder";

interface UserInfoForm {
  email: string;
  name: string;
  phoneNumber: string;
  file?: string | null | undefined;
  fileName?: string | null | undefined;
  mime?: string | null | undefined;
}

export default function UpdateUserInfo() {
  const { control, handleSubmit, getValues, setValue, setError, clearErrors } =
    useForm<UserInfoForm>({
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        email: "",
        name: "",
        phoneNumber: "",
        file: null,
        fileName: null,
        mime: null, //  jpg, jpeg, png, gif, bmp
      },
    });

  const thunkDispatch = useThunkDispatch();
  const toast = useToastContext();
  const router = useRouter();

  const { status, message, error, user } = useAppSelector(
    (state) => ({
      status: state.getUser.status,
      message: state.getUser.message,
      error: state.getUser.error,
      user: state.getUser.user,
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

  const handleChangeUserInfo = () => {};

  useEffect(() => {
    thunkDispatch(getUser(null));
  }, [thunkDispatch]);

  useEffect(() => {
    if (status === "fulfilled") {
      setValue("email", user ? user.email : "");
      setValue("name", user ? user.name : "");
      setValue("phoneNumber", user ? user.contact : "");
    }

    if (status === "rejected") {
      toast.error({ heading: "Error", message: error });
    }
  }, [status]);

  return (
    <>
      <form className="space-y-2" onSubmit={handleSubmit(handleChangeUserInfo)}>
        <h2 className="text-25 font-bold">프로필</h2>

        <div className="flex flex-col">
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
                <p className="px-5 text-13 text-red">
                  {error && error.message}
                </p>
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
        </div>

        <div className="flex justify-end space-x-1">
          <Button onClick={() => router.push("/")}>취소</Button>
          <Button className="text-salem">프로필 변경</Button>
        </div>
      </form>
    </>
  );
}
