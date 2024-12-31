import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";

import { useRouter } from "next/navigation";

import Button from "@components/button";
import Modal from "@components/modal";

import useToastContext from "@hook/use-toast-context";

import { deleteUser } from "@redux/apis/user-api";
import { useAppSelector, useThunkDispatch } from "@redux/hook";

export default function DeleteUser() {
  const router = useRouter();
  const dispatch = useThunkDispatch();
  const toast = useToastContext();

  const [modalOpen, setModalOpen] = useState(false);

  const { status, message, error } = useAppSelector(
    (state) => ({
      status: state.user.deleteUser.status,
      message: state.user.deleteUser.message,
      error: state.user.deleteUser.error,
    }),
    shallowEqual,
  );

  const handleSwitchModal = () => {
    setModalOpen(!modalOpen);
  };

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
      <Button className="text-red" onClick={handleSwitchModal}>
        회원탈퇴
      </Button>

      <Modal
        width={400}
        height={150}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="flex flex-col justify-between space-y-2"
      >
        <div>삭제하면 되돌릴 수 없습니다. 정말 삭제하시겠습니까?</div>
        <div className="flex justify-center space-x-1">
          <Button>취소</Button>
          <Button className="text-red" onClick={handleDeleteUser}>
            회원탈퇴
          </Button>
        </div>
      </Modal>
    </>
  );
}
