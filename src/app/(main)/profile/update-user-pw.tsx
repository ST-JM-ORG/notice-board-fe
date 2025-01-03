import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";

import Button from "@/components/button";
import Input from "@/components/input";

import { PwRegex } from "@/constants/regex";

import useToastContext from "@/hook/use-toast-context";

import { updatePw } from "@/redux/apis/user-api";
import { useAppDispatch, useAppSelector, useThunkDispatch } from "@/redux/hook";
import { resetAuth } from "@/redux/modules/auth-slice";

interface UserPwForm {
  currPw: string;
  newPw: string;
  newPwConfirm: string;
}

export default function UpdateUserPw() {
  const { control, handleSubmit, getValues, setError, watch } =
    useForm<UserPwForm>({
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        currPw: "",
        newPw: "",
        newPwConfirm: "",
      },
    });

  const appDispatch = useAppDispatch();
  const dispatch = useThunkDispatch();
  const toast = useToastContext();

  const { status, message, error, code } = useAppSelector(
    (state) => ({
      status: state.user.changePw.status,
      message: state.user.changePw.message,
      error: state.user.changePw.error,
      code: state.user.changePw.code,
    }),
    shallowEqual,
  );

  const handleChangePw = () => {
    const currPw = getValues("currPw");
    const newPw = getValues("newPw");
    dispatch(updatePw({ currPw, newPw }));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success({ heading: "Success", message });
    } else if (status === "rejected") {
      toast.error({ heading: "Error", message: error });

      if (code === "E106") {
        setError("currPw", { message: error });
      } else if (code === "E004") {
        setError("newPw", { message: error });
      }
    }
  }, [status]);

  useEffect(() => {
    return () => {
      appDispatch(resetAuth("changePw"));
    };
  }, [appDispatch]);

  return (
    <>
      <form className="space-y-2" onSubmit={handleSubmit(handleChangePw)}>
        <Controller
          name="currPw"
          control={control}
          rules={{
            required: "현재 비밀번호를 입력해주세요",
            pattern: {
              value: PwRegex,
              message: "비밀번호 형식을 맞춰주세요",
            },
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상으로 입력해주세요",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="password"
              className="rounded-t-none"
              text="현재 비밀번호"
              helperText={error && error.message}
              {...field}
            />
          )}
        />

        <Controller
          name="newPw"
          control={control}
          rules={{
            required: "변경할 비밀번호를 입력해주세요",
            pattern: {
              value: PwRegex,
              message: "비밀번호 형식을 맞춰주세요",
            },
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상으로 입력해주세요",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="password"
              className="rounded-t-none"
              text="변경할 비밀번호"
              helperText={error && error.message}
              {...field}
            />
          )}
        />

        <Controller
          name="newPwConfirm"
          control={control}
          rules={{
            required: "변경할 비밀번호 확인을 입력해주세요",
            pattern: {
              value: PwRegex,
              message: "비밀번호 형식을 맞춰주세요",
            },
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상으로 입력해주세요",
            },
            validate: (value) =>
              value === watch("newPw") || "비밀번호가 일치하지 않습니다",
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="password"
              className="rounded-t-none"
              text="변경할 비밀번호 확인"
              helperText={error && error.message}
              {...field}
            />
          )}
        />

        <div className="flex flex-col items-start text-14 text-sonic-silver">
          <span className="font-bold">비밀번호 규칙</span>
          <span>- 8자리 이상</span>
          <span>- 영어 대문자, 숫자, 특수문자 포함</span>
        </div>

        <div className="flex justify-end">
          <Button type="submit">비밀번호 변경</Button>
        </div>
      </form>
    </>
  );
}
