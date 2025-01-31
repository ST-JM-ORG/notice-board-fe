"use client";

import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";

import { getCategories } from "@/redux/apis/category-api";
import { useAppSelector, useThunkDispatch } from "@/redux/hook";

import { cn } from "@/utils/classname";

export default function SideBar() {
  const dispatch = useThunkDispatch();

  const { categories } = useAppSelector(
    (state) => ({ categories: state.category.get.categories }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="fixed h-screen w-200 border-r-1 border-r-anti-flash-white bg-cultured p-5">
      {categories &&
        categories.map(({ id, categoryNm }) => (
          <div
            key={id}
            className={cn(
              "rounded-10 p-10 transition-colors duration-200 ease-in-out",
              "hover:cursor-pointer hover:bg-gainsboro",
            )}
          >
            {categoryNm}
          </div>
        ))}
    </div>
  );
}
