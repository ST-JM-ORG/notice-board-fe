"use client";

import React, { ChangeEvent, use, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

import { useRouter } from "next/navigation";

import Button from "@/components/button";
import Input from "@/components/input";
import ProfileUploader from "@/components/profile-uploader";
import RadioButton from "@/components/radio-button";
import RadioGroup from "@/components/radio-group";

import { IMAGE_WHITELIST } from "@/constants/mime";

import useToastContext from "@/hook/use-toast-context";

import { AdminDetailForm } from "@/models/validator-model";

import { getAdminUserDetail, updateAdminUser } from "@/redux/apis/admin-api";
import { useAppDispatch, useAppSelector, useThunkDispatch } from "@/redux/hook";
import { resetAdmin } from "@/redux/modules/admin-slice";

import { encodeFileToBase64 } from "@/utils/file-encoder";

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page(props: Props) {
  const { params } = props;

  const { control, handleSubmit, getValues, setValue, setError, clearErrors } =
    useForm<AdminDetailForm>({
      mode: "onChange",
      reValidateMode: "onChange",
      resolver: classValidatorResolver(AdminDetailForm),
      defaultValues: {
        email: "",
        name: "",
        phoneNumber: "",
        originFile: null,
        file: null,
        fileName: null,
        mime: null, //  jpg, jpeg, png, gif, bmp
        isProfileDel: false,
        permission: 0,
      },
    });

  const { id } = use(params);

  const toast = useToastContext();
  const router = useRouter();
  const dispatch = useThunkDispatch();
  const appDispatch = useAppDispatch();

  const [defaultImg, setDefaultImg] = useState<string | null>(null);

  const {
    updateStatus,
    updateMsg,
    updateError,
    detailStatus,
    detailError,
    user,
  } = useAppSelector(
    (state) => ({
      updateStatus: state.admin.update.status,
      updateMsg: state.admin.update.message,
      updateError: state.admin.update.error,
      detailStatus: state.admin.detail.status,
      detailError: state.admin.detail.error,
      user: state.admin.detail.user,
    }),
    shallowEqual,
  );

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
            setValue("originFile", file);
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
    setValue("originFile", null);
    setValue("file", null);
    setValue("fileName", null);
    setValue("mime", null);
    setValue("isProfileDel", true);
    setDefaultImg(null);
  };

  const handleChangePermission = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("permission", Number(e.target.value));
  };

  const handleChangeUserInfo = () => {
    const formData = new FormData();

    const name = getValues("name");
    const phoneNum = getValues("phoneNumber");
    const file = getValues("originFile");
    const isProfileDel = getValues("isProfileDel");
    const permission = getValues("permission");

    if (file) {
      formData.append("profileImg", file);
    }
    formData.append("name", name);
    formData.append("contact", phoneNum);
    formData.append("profileDelYn", isProfileDel ? "Y" : "N");
    formData.append("adminYn", permission ? "Y" : "N");

    dispatch(updateAdminUser({ id, formData }));
  };

  useEffect(() => {
    dispatch(getAdminUserDetail({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (detailStatus === "fulfilled") {
      setValue("email", user ? user.email : "");
      setValue("name", user ? user.name : "");
      setValue("phoneNumber", user ? user.contact : "");
      setValue("permission", user && user.adminYn === "Y" ? 1 : 0);

      if (user && user.profileImg) {
        setDefaultImg(process.env.NEXT_PUBLIC_BASE_URL + user.profileImg);
      } else {
        setDefaultImg(null);
      }
    } else if (detailStatus === "rejected") {
      toast.error({ heading: "Error", message: detailError });
    }
  }, [detailStatus]);

  useEffect(() => {
    if (updateStatus === "fulfilled") {
      toast.success({ heading: "Success", message: updateMsg });
      router.push("/admin");
    } else if (updateStatus === "rejected") {
      toast.error({ heading: "Error", message: updateError });
    }
  }, [updateStatus]);

  useEffect(() => {
    return () => {
      appDispatch(resetAdmin("update"));
    };
  }, [appDispatch]);

  if (detailStatus === "pending") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleChangeUserInfo)} className="flex">
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
                required
                value={value}
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

          <Controller
            name="permission"
            control={control}
            render={({ field: { value } }) => (
              <div>
                <p className="text-18 text-black">권한설정</p>
                <RadioGroup name="permission" className="flex space-x-2">
                  <RadioButton
                    label="관리자"
                    value={1}
                    groupValue={value}
                    onChange={handleChangePermission}
                  />
                  <RadioButton
                    label="사용자"
                    value={0}
                    groupValue={value}
                    onChange={handleChangePermission}
                  />
                </RadioGroup>
              </div>
            )}
          />
        </div>

        <div className="mt-20 flex justify-end space-x-1">
          <Button type="button" onClick={() => router.push("/admin")}>
            취소
          </Button>
          <Button type="submit">수정</Button>
        </div>
      </div>
    </form>
  );
}
