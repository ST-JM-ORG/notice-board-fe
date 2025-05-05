import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import {
  UserDetailScheme,
  UserDetailSchemeType,
} from "@/src/entities/common/validator-model";
import ProfileUploader from "@/src/features/common/profile-uploader";
import useToastContext from "@/src/hook/use-toast-context";
import {
  useAppDispatch,
  useAppSelector,
  useThunkDispatch,
} from "@/src/redux/hook";
import { resetUser } from "@/src/redux/modules/user-slice";
import { reissueToken } from "@/src/services/auth-api";
import { getUser, updateUser } from "@/src/services/user-api";
import Button from "@/src/shared/components/button";
import Input from "@/src/shared/components/input";
import { IMAGE_WHITELIST } from "@/src/shared/constants/mime";
import { encodeFileToBase64 } from "@/src/shared/utils/file-encoder";

export default function UpdateUserInfo() {
  const { control, handleSubmit, getValues, setValue, setError, clearErrors } =
    useForm<UserDetailSchemeType>({
      mode: "onChange",
      reValidateMode: "onChange",
      resolver: zodResolver(UserDetailScheme),
      defaultValues: {
        email: "",
        name: "",
        phoneNumber: "",
        file: null,
        fileName: null,
        mime: null, //  jpg, jpeg, png, gif, bmp
        isProfileDel: false,
      },
    });

  const toast = useToastContext();
  const router = useRouter();
  const dispatch = useThunkDispatch();
  const appDispatch = useAppDispatch();

  // Get user
  const { status, error, user, updateStatus, updateMsg, updateError } =
    useAppSelector(
      (state) => ({
        status: state.user.getUser.status,
        error: state.user.getUser.error,
        user: state.user.getUser.user,
        updateStatus: state.user.updateUser.status,
        updateMsg: state.user.updateUser.message,
        updateError: state.user.updateUser.error,
      }),
      shallowEqual,
    );

  const [defaultImg, setDefaultImg] = useState<string | null>(null);
  const [originFile, setOriginFile] = useState<File | null>(null);

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const file: File = e.target.files[0];

      if (file) {
        if (!IMAGE_WHITELIST.includes(file.type)) {
          setError("file", {
            message: "jpg, jpeg, png, gif, bmp 확장자만 허용됩니다.",
          });
        } else {
          clearErrors("file");
          const encodedFile = await encodeFileToBase64(file);
          if (typeof encodedFile === "string") {
            setOriginFile(file);
            setValue("file", encodedFile);
            setValue("fileName", file.name);
            setValue("mime", file.type);
            setValue("isProfileDel", true);
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
    setValue("isProfileDel", true);
    setOriginFile(null);
    setDefaultImg(null);
  };

  const handleChangeUserInfo = () => {
    const formData = new FormData();

    const name = getValues("name");
    const phoneNumber = getValues("phoneNumber");
    const isProfileDel = getValues("isProfileDel");

    if (originFile) {
      formData.append("profileImg", originFile);
    }
    formData.append("name", name);
    formData.append("contact", phoneNumber ? phoneNumber : "");
    formData.append("profileDelYn", isProfileDel ? "Y" : "N");

    dispatch(updateUser({ formData }));
  };

  useEffect(() => {
    dispatch(getUser(null));
  }, [dispatch]);

  useEffect(() => {
    if (status === "fulfilled") {
      setValue("email", user ? user.email : "");
      setValue("name", user ? user.name : "");
      setValue("phoneNumber", user ? user.contact : "");
      if (user?.profileImg) {
        setDefaultImg(process.env.NEXT_PUBLIC_BASE_URL + user.profileImg);
      } else {
        setDefaultImg(null);
      }
    } else if (status === "rejected") {
      toast.error({ heading: "Error", message: error });
    }
  }, [status]);

  useEffect(() => {
    if (updateStatus === "fulfilled") {
      dispatch(reissueToken(null));
      toast.success({ heading: "Success", message: updateMsg });
    } else if (updateStatus === "rejected") {
      toast.error({ heading: "Error", message: updateError });
    }
  }, [updateStatus]);

  useEffect(() => {
    return () => {
      appDispatch(resetUser("updateUser"));
    };
  }, [appDispatch]);

  return (
    <>
      <h2 className="text-25 font-bold">프로필</h2>
      <form className="space-y-2" onSubmit={handleSubmit(handleChangeUserInfo)}>
        <div className="flex flex-col">
          <Controller
            name="file"
            control={control}
            render={({ field: { value }, fieldState: { error } }) => (
              <div className="flex flex-col items-center justify-center space-y-2">
                <ProfileUploader
                  size={250}
                  defaultImg={defaultImg}
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
                  required
                  value={value}
                  onChange={() => {}}
                  disabled={true}
                />
              )}
            />

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  type="text"
                  className="rounded-t-none"
                  text="이름"
                  helperText={error && error.message}
                  required
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
          <Button type="submit" className="text-salem">
            프로필 변경
          </Button>
        </div>
      </form>
    </>
  );
}
