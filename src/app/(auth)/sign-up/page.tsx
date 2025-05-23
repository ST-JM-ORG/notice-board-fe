"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { shallowEqual } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import {
  SignUpScheme,
  SignUpSchemeType,
} from "@/src/entities/common/validator-model";
import ProfileUploader from "@/src/features/common/profile-uploader";
import useToastContext from "@/src/hook/use-toast-context";
import {
  useAppDispatch,
  useAppSelector,
  useThunkDispatch,
} from "@/src/redux/hook";
import { resetAuth } from "@/src/redux/modules/auth-slice";
import { emailDupCheck, signUp } from "@/src/services/auth-api";
import Button from "@/src/shared/components/button";
import Input from "@/src/shared/components/input";
import { IMAGE_WHITELIST } from "@/src/shared/constants/mime";
import { EmailRegex } from "@/src/shared/constants/regex";
import { encodeFileToBase64 } from "@/src/shared/utils/file-encoder";

const Page = () => {
  const { control, handleSubmit, getValues, setValue, setError, clearErrors } =
    useForm<SignUpSchemeType>({
      mode: "onChange",
      reValidateMode: "onChange",
      resolver: zodResolver(SignUpScheme),
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

  const toast = useToastContext();
  const router = useRouter();
  const dispatch = useThunkDispatch();
  const appDispatch = useAppDispatch();

  const [originFile, setOriginFile] = useState<File | null>(null);

  // 회원가입
  const {
    signUpStatus,
    signUpMsg,
    signUpError,
    signUpTarget,
    emailDupCheckStatus,
    emailDupCheckMsg,
    emailDupCheckError,
    emailDupCheckTarget,
  } = useAppSelector(
    (state) => ({
      signUpStatus: state.auth.signUp.status,
      signUpMsg: state.auth.signUp.message,
      signUpError: state.auth.signUp.error,
      signUpTarget: state.auth.signUp.errorTarget,
      emailDupCheckStatus: state.auth.emailDupCheck.status,
      emailDupCheckMsg: state.auth.emailDupCheck.message,
      emailDupCheckError: state.auth.emailDupCheck.error,
      emailDupCheckTarget: state.auth.emailDupCheck.errorTarget,
    }),
    shallowEqual,
  );

  const handleRouteSignUp = () => {
    router.push("/login");
  };

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

  const handleEmailDupCheck = () => {
    const email: string = getValues("email");

    if (!email) {
      setError("email", { message: "이메일을 입력해주세요" });
    } else if (!EmailRegex.test(email)) {
      setError("email", { message: "이메일 형식을 맞춰주세요" });
    } else {
      dispatch(emailDupCheck({ email }));
    }
  };

  const handleSignUp = () => {
    const formData = new FormData();

    formData.append("email", getValues("email"));
    formData.append("password", getValues("pw"));
    formData.append("name", getValues("name"));
    formData.append("contact", getValues("phoneNumber"));
    if (originFile) {
      formData.append("profileImg", originFile);
    }

    dispatch(signUp({ formData }));
  };

  useEffect(() => {
    if (emailDupCheckStatus === "fulfilled") {
      toast.success({
        heading: "Success",
        message: emailDupCheckMsg,
      });
    } else if (emailDupCheckStatus === "rejected") {
      if (emailDupCheckTarget === "email") {
        setError("email", { message: emailDupCheckError });
      } else {
        toast.error({
          heading: "Error",
          message: emailDupCheckError,
        });
      }
    }
  }, [emailDupCheckStatus]);

  useEffect(() => {
    if (signUpStatus === "fulfilled") {
      toast.success({ heading: "Success", message: signUpMsg });
      router.push("/login");
    } else if (signUpStatus === "rejected") {
      if (signUpTarget === "password") {
        setError("pw", { message: signUpError });
        setError("pwConfirm", { message: signUpError });
      } else if (signUpTarget === "email") {
        setError("email", { message: signUpError });
      } else if (signUpTarget === "image") {
        setError("file", { message: signUpError });
      } else {
        toast.error({ heading: "Error", message: signUpError });
      }
    }
  }, [signUpStatus]);

  useEffect(() => {
    return () => {
      appDispatch(resetAuth("signUp"));
    };
  }, [appDispatch]);

  return (
    <>
      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-2">
        <p className="mb-10 text-center text-25 font-bold">회원가입</p>

        <Controller
          name="file"
          control={control}
          render={({ field: { value }, fieldState: { error } }) => (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-start space-x-2">
                <ProfileUploader
                  size={150}
                  file={value}
                  onChange={handleChangeFile}
                />
                <div>
                  <div className="space-x-1">
                    <Button type="button" onClick={handleRemoveProfile}>
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
              </div>
              <p className="px-5 text-13 text-red">{error && error.message}</p>
            </div>
          )}
        />

        <div className="flex space-x-1">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                type="text"
                className="w-full rounded-b-none"
                text="이메일"
                helperText={error && error.message}
                required={true}
                {...field}
              />
            )}
          />

          <Button
            type="button"
            className="h-54 w-100"
            onClick={handleEmailDupCheck}
          >
            중복체크
          </Button>
        </div>

        <Controller
          name="pw"
          control={control}
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

        <Button
          type="submit"
          className="w-full rounded-10 py-10 text-20"
          bgColor="bg-baby-blue-eyes"
          borderColor="border-dark-sky-blue"
        >
          회원가입
        </Button>
      </form>

      <div className="mt-8 flex items-center justify-center space-x-2">
        <span>이미 계정이 있으신가요?</span>
        <button className="flex items-center" onClick={handleRouteSignUp}>
          <span className="underline">로그인하러가기</span>
          <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default Page;
