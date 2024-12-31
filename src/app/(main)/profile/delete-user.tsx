import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";

import { useRouter } from "next/navigation";

import Button from "@components/button";

import useToastContext from "@hook/use-toast-context";

import { deleteUser } from "@redux/apis/user-api";
import { useAppSelector, useThunkDispatch } from "@redux/hook";

export default function DeleteUser() {
  const router = useRouter();
  const dispatch = useThunkDispatch();
  const toast = useToastContext();

  const { status, message, error } = useAppSelector(
    (state) => ({
      status: state.user.deleteUser.status,
      message: state.user.deleteUser.message,
      error: state.user.deleteUser.error,
    }),
    shallowEqual,
  );

  const handleDeleteUser = () => {
    dispatch(deleteUser(null));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success({ heading: "Success", message });
      router.replace("/login");
    } else if (status === "rejected") {
      toast.error({ heading: "Error", message: error });
    }
  }, [status]);

  return (
    <>
      <h1 className="text-25">회원탈퇴</h1>
      <div className="text-14 text-sonic-silver">
        회원탈퇴를 하면 다시 복구할 수 없습니다.
      </div>
      <Button className="text-red" onClick={handleDeleteUser}>
        회원탈퇴
      </Button>
    </>
  );
}
