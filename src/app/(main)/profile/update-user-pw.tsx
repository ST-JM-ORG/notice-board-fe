import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/button";
import Input from "@/components/input";

import useToastContext from "@/hook/use-toast-context";

import { UpdatePwScheme, UpdatePwSchemeType } from "@/models/validator-model";

import { updatePw } from "@/redux/apis/user-api";
import { useAppDispatch, useAppSelector, useThunkDispatch } from "@/redux/hook";
import { resetAuth } from "@/redux/modules/auth-slice";

export default function UpdateUserPw() {
  const { control, handleSubmit, getValues, setError, watch } =
    useForm<UpdatePwSchemeType>({
      mode: "onChange",
      reValidateMode: "onChange",
      resolver: zodResolver(UpdatePwScheme),
      defaultValues: {
        currPw: "",
        newPw: "",
        newPwConfirm: "",
      },
    });

  const toast = useToastContext();
  const dispatch = useThunkDispatch();
  const appDispatch = useAppDispatch();

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
