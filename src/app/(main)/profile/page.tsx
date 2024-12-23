"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

import TabBar from "@components/tab-bar";
import TabBarButton from "@components/tab-bar-button";

import UpdateUserInfo from "@pages/user/update-user-info";
import UpdateUserPw from "@pages/user/update-user-pw";

export default function Page() {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChangeTabIndex = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className="mx-auto max-w-[40rem] space-y-3 bg-white">
      <TabBar>
        <TabBarButton<number>
          icon={<FaUser />}
          text="프로필"
          groupValue={tabIndex}
          value={0}
          onChangeValue={handleChangeTabIndex}
        />
        <TabBarButton<number>
          icon={<RiLockPasswordLine />}
          text="비밀번호 변경"
          groupValue={tabIndex}
          value={1}
          onChangeValue={handleChangeTabIndex}
        />
      </TabBar>

      <div
        className="h-full space-y-2 rounded-20 border-1 border-gainsboro px-40 py-40 shadow-md
          backdrop-blur"
      >
        {tabIndex === 0 ? <UpdateUserInfo /> : <UpdateUserPw />}
      </div>
    </div>
  );
}
