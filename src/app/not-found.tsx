"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";

import Link from "next/link";

import Header from "@/src/features/common/header";

export default function NotFound() {
  return (
    <>
      <main className="h-full w-full">
        <Header />
        <div className="mx-auto mt-30 flex max-w-[80rem] flex-col items-center px-10">
          <h1 className="text-35 font-bold">
            죄송합니다. 해당 페이지는 찾을 수 없습니다.
          </h1>
          <Link href="/" className="flex items-center space-x-1 underline">
            <span>메인 페이지로 이동</span>
            <FaArrowRight />
          </Link>
        </div>
      </main>
    </>
  );
}
