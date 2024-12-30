import React from "react";
import { Controller, useForm } from "react-hook-form";

import Button from "@components/button";
import Input from "@components/input";

interface UserPwForm {
  currPw: string;
  newPw: string;
  newPwConfirm: string;
}

export default function UpdateUserPw() {
  const { control, handleSubmit, getValues, setValue, setError, clearErrors } =
    useForm<UserPwForm>({
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        currPw: "",
        newPw: "",
        newPwConfirm: "",
      },
    });

  const handleChangePw = () => {};

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

        <div className="flex justify-end">
          <Button type="submit">비밀번호 변경</Button>
        </div>
      </form>
    </>
  );
}
