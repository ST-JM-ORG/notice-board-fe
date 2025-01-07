import React from "react";
import { FaArrowRight } from "react-icons/fa";

import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className="text-35 font-bold">
        죄송합니다. 해당 페이지에 대한 권한이 없어 접근할 수 없습니다.
      </h1>
      <Link href="/" className="flex items-center space-x-1 underline">
        <span>메인 페이지로 이동</span>
        <FaArrowRight />
      </Link>
    </>
  );
}
