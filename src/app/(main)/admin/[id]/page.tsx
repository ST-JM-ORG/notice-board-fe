"use client";

import React, { ChangeEvent, use, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import {
  AdminDetailScheme,
  AdminDetailSchemeType,
} from "@/src/entities/models/validator-model";
import ConfirmModal from "@/src/features/common/confirm-modal";
import ProfileUploader from "@/src/features/common/profile-uploader";
import RadioButton from "@/src/features/common/radio-button";
import RadioGroup from "@/src/features/common/radio-group";
import useToastContext from "@/src/hook/use-toast-context";
import {
  useAppDispatch,
  useAppSelector,
  useThunkDispatch,
} from "@/src/redux/hook";
import { resetAdmin } from "@/src/redux/modules/admin-slice";
import {
  deleteAdminUser,
  getAdminUserDetail,
  updateAdminUser,
} from "@/src/services/admin-api";
import Button from "@/src/shared/components/button";
import Input from "@/src/shared/components/input";
import { IMAGE_WHITELIST } from "@/src/shared/constants/mime";
import { encodeFileToBase64 } from "@/src/shared/utils/file-encoder";
import { adminRole, superAdminRole } from "@/src/shared/utils/role";

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page(props: Props) {
  const { params } = props;

  const { control, handleSubmit, getValues, setValue, setError, clearErrors } =
    useForm<AdminDetailSchemeType>({
      mode: "onChange",
      reValidateMode: "onChange",
      resolver: zodResolver(AdminDetailScheme),
      defaultValues: {
        email: "",
        name: "",
        phoneNumber: "",
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

  const [modalOpen, setModalOpen] = useState(false);
  const [defaultImg, setDefaultImg] = useState<string | null>(null);
  const [originFile, setOriginFile] = useState<File | null>(null);

  const {
    updateStatus,
    updateMsg,
    updateError,
    detailStatus,
    detailError,
    user,
    delStatus,
    delMsg,
    delError,
    role,
  } = useAppSelector(
    (state) => ({
      updateStatus: state.admin.update.status,
      updateMsg: state.admin.update.message,
      updateError: state.admin.update.error,
      detailStatus: state.admin.detail.status,
      detailError: state.admin.detail.error,
      user: state.admin.detail.user,
      delStatus: state.admin.delete.status,
      delMsg: state.admin.delete.message,
      delError: state.admin.delete.error,
      role: state.token.role,
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

  const handleChangePermission = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("permission", Number(e.target.value));
  };

  const handleChangeUserInfo = () => {
    const formData = new FormData();

    const name = getValues("name");
    const phoneNum = getValues("phoneNumber");
    const isProfileDel = getValues("isProfileDel");
    const permission = getValues("permission");

    if (originFile) {
      formData.append("profileImg", originFile);
    }
    formData.append("name", name);
    formData.append("contact", phoneNum ? phoneNum : "");
    formData.append("profileDelYn", isProfileDel ? "Y" : "N");
    formData.append("adminYn", permission ? "Y" : "N");

    dispatch(updateAdminUser({ id, formData }));
  };

  const handleCancel = () => {
    router.push("/admin");
  };

  const handleDelete = () => {
    dispatch(deleteAdminUser({ id }));
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
    if (delStatus === "fulfilled") {
      toast.success({ heading: "Success", message: delMsg });
      router.push("/admin");
    } else if (delStatus === "rejected") {
      toast.error({ heading: "Error", message: delError });
    }
  }, [delStatus]);

  useEffect(() => {
    return () => {
      appDispatch(resetAdmin("detail"));
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
    <>
      <form className="flex" onSubmit={handleSubmit(handleChangeUserInfo)}>
        <Controller
          name="file"
          control={control}
          render={({ field: { value }, fieldState: { error } }) => (
            <div className="flex flex-col items-center justify-center space-y-2">
              <ProfileUploader
                size={250}
                defaultImg={defaultImg}
                file={value}
                disabled={!superAdminRole(role)}
                onChange={handleChangeFile}
              />
              <div className="flex flex-col items-center justify-start space-y-1">
                <div className="space-x-1">
                  <Button type="button" onClick={() => {}}>
                    미리보기
                  </Button>
                  {adminRole(role) && (
                    <Button
                      type="button"
                      className="text-red"
                      onClick={handleRemoveProfile}
                    >
                      삭제
                    </Button>
                  )}
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
            <Button
              type="button"
              className="text-red"
              onClick={() => setModalOpen(true)}
            >
              삭제
            </Button>
            <Button type="button" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit">수정</Button>
          </div>
        </div>
      </form>

      <ConfirmModal
        open={modalOpen}
        message="해당 작업은 실행 후 되돌릴 수 없습니다. 정말 삭제하시겠습니까?"
        onClose={() => setModalOpen(false)}
        onOk={handleDelete}
      />
    </>
  );
}
