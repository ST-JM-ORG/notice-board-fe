import React from "react";
import { Controller, useForm } from "react-hook-form";

import Button from "@components/button";
import Input from "@components/input";

interface UserPwForm {
  pw: string;
  pwConfirm: string;
}

export default function UpdateUserPw() {
  const { control, handleSubmit, getValues, setValue, setError, clearErrors } =
    useForm<UserPwForm>({
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        pw: "",
        pwConfirm: "",
      },
    });

  const handleChangePw = () => {};

  return (
    <>
      <form className="space-y-2" onSubmit={handleSubmit(handleChangePw)}>
        <Controller
          name="pw"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="password"
              className="rounded-t-none"
              text="비밀번호"
              helperText={error && error.message}
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
              {...field}
            />
          )}
        />

        <div className="flex justify-end">
          <Button>비밀번호 변경</Button>
        </div>
      </form>
    </>
  );
}
