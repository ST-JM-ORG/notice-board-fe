import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  UpdatePwScheme,
  UpdatePwSchemeType,
} from "@/src/entities/models/validator-model";
import useToastContext from "@/src/hook/use-toast-context";
import {
  useAppDispatch,
  useAppSelector,
  useThunkDispatch,
} from "@/src/redux/hook";
import { resetAuth } from "@/src/redux/modules/auth-slice";
import { updatePw } from "@/src/services/user-api";
import Button from "@/src/shared/components/button";
import Input from "@/src/shared/components/input";

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
      <h1 className="text-25 font-bold">비밀번호 변경</h1>
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
