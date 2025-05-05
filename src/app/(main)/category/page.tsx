"use client";

import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { shallowEqual } from "react-redux";

import { useAppSelector } from "@/src/redux/hook";
import { cn } from "@/src/shared/utils/classname";

export default function Page() {
  const { categories } = useAppSelector(
    (state) => ({ categories: state.category.get.categories }),
    shallowEqual,
  );

  return (
    <>
      <h1 className="mb-10 text-20 font-bold">카테고리 관리</h1>
      <h3 className="text-14 font-medium text-sonic-silver">
        카테고리 순서와 이름을 변경할 수 있습니다.
      </h3>
      <div className="text-14 font-medium text-sonic-silver">
        드래그 앤 드롭으로 카테고리 순서를 변경할 수 있습니다.
      </div>
      <div className="mt-20 rounded-10 border-1 border-silver-sand bg-cultured p-10">
        {categories &&
          categories.map(({ id, categoryNm }) => (
            <div
              key={id}
              className="flex items-center justify-between rounded-10 bg-white p-10"
            >
              <div className="flex">
                <span className={cn("mr-5", "hover:cursor-pointer")}>
                  <IoMenuSharp size={20} className="text-sonic-silver" />
                </span>
                <span className="text-16">{categoryNm}</span>
              </div>

              <div className="flex items-center">
                <button
                  className={cn(
                    "rounded-1/2 p-5 transition-colors duration-200 ease-in-out",
                    "hover:bg-anti-flash-white",
                  )}
                >
                  <FaPencilAlt size={15} className="text-sonic-silver" />
                </button>
                <button
                  className={cn(
                    "rounded-1/2 p-2 transition-colors duration-200 ease-in-out",
                    "hover:bg-anti-flash-white",
                  )}
                >
                  <MdDelete size={20} className="text-sonic-silver" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
