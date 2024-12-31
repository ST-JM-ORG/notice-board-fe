"use client";

import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

import DeleteUser from "@app/(main)/profile/delete-user";
import UpdateUserInfo from "@app/(main)/profile/update-user-info";
import UpdateUserPw from "@app/(main)/profile/update-user-pw";

import TabBar from "@components/tab-bar";

export default function Page() {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChangeTabIndex = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className="mx-auto max-w-[40rem] space-y-3 bg-white">
      <TabBar
        tabIndex={tabIndex}
        onChangeValue={handleChangeTabIndex}
        items={[
          { icon: <FaUser />, text: "프로필" },
          { icon: <RiLockPasswordLine />, text: "비밀번호 변경" },
          { icon: <AiTwotoneDelete />, text: "회원탈퇴" },
        ]}
      />

      <div
        className="h-full space-y-2 rounded-20 border-1 border-gainsboro px-40 py-40 shadow-md
          backdrop-blur"
      >
        {tabIndex === 0 && <UpdateUserInfo />}
        {tabIndex === 1 && <UpdateUserPw />}
        {tabIndex === 2 && <DeleteUser />}
      </div>
    </div>
  );
}
