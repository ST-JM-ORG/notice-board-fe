"use client";

import React from "react";

import Input from "@/components/input";

const Page = () => {
  return (
    <div className="max-w-500 border-1 p-50">
      <p className="mb-10 text-center text-25 font-bold">로그인</p>
      <Input
        type="text"
        placeholder="아이디를 입력해주세요"
        className="rounded-b-none"
      />
      <Input
        type="text"
        placeholder="비밀번호를 입력해주세요"
        className="rounded-t-none"
      />
      <div className="flex justify-between">
        <div>
          <input type="checkbox" />
          <span>아이디 저장</span>
        </div>
        <div className="text-gray-500">비밀번호 찾기</div>
      </div>
    </div>
  );
};

export default Page;
