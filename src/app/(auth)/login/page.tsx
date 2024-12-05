"use client";

import React, { ChangeEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import { useRouter } from "next/navigation";

import Input from "@/components/input";

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  const handleRouteSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <div
      className="w-full min-w-500 max-w-500 space-y-2 rounded-20 border-1 bg-anti-flash-white
        px-20 py-50 shadow-lg"
    >
      <p className="mb-10 text-center text-25 font-bold">LOGIN</p>
      <Input
        type="text"
        className="rounded-b-none"
        text="이메일"
        value={email}
        onChange={handleChangeId}
      />
      <Input
        type="text"
        className="rounded-t-none"
        text="비밀번호"
        value={pw}
        onChange={handleChangePw}
      />
      <div className="flex justify-between">
        <div className="space-x-1">
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">아이디 저장</label>
        </div>
        <div className="text-gray-500 underline hover:cursor-pointer">
          비밀번호 찾기
        </div>
      </div>
      <button className="bg-baby-blue-eyes w-full rounded-10 py-10 text-20">
        로그인
      </button>
      <div className="flex items-center justify-center space-x-2">
        <span>계정이 없으신가요?</span>
        <button className="flex items-center" onClick={handleRouteSignUp}>
          <span>회원가입하러가기</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Page;
