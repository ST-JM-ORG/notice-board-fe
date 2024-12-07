"use client";

import React, { ChangeEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import { useRouter } from "next/navigation";

import Input from "@/components/input";

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleChangeSignUpId = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChangeSignUpPw = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  const handleChangeSignUpName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleRouteSignUp = () => {
    router.push("/login");
  };

  return (
    <>
      <div
        className="w-full min-w-500 max-w-500 space-y-2 rounded-20 border-1 bg-anti-flash-white
          px-20 py-50 shadow-lg"
      >
        <p className="mb-10 text-center text-25 font-bold">SIGN UP</p>
        <div className="flex space-x-1">
          <Input
            type="text"
            className="w-full rounded-b-none"
            text="이메일"
            value={email}
            onChange={handleChangeSignUpId}
          />
          <button
            className="w-100 rounded-10 border-1 bg-silver-sand transition-colors duration-100
              ease-in-out hover:bg-gainsboro"
          >
            중복체크
          </button>
        </div>
        <Input
          type="text"
          className="rounded-t-none"
          text="비밀번호"
          value={pw}
          onChange={handleChangeSignUpPw}
        />
        <Input
          type="text"
          className="rounded-t-none"
          text="이름"
          value={name}
          onChange={handleChangeSignUpName}
        />
        <button className="w-full rounded-10 bg-baby-blue-eyes py-10 text-20">
          회원가입
        </button>
        <div className="flex items-center justify-center space-x-2">
          <span>이미 계정이 있으신가요?</span>
          <button className="flex items-center" onClick={handleRouteSignUp}>
            <span>로그인하러가기</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
