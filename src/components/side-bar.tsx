"use client";

import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";

import { usePathname, useRouter } from "next/navigation";

import SideBarButton from "@/components/side-bar-button";

import { getCategories } from "@/redux/apis/category-api";
import { useAppDispatch, useAppSelector, useThunkDispatch } from "@/redux/hook";
import { changeCategory } from "@/redux/modules/category-slice";

import { ADMIN_ROUTE, CATEGORY_ROUTE, HOME_ROUTE } from "@/utils/routes";

interface AdminCategory {
  id: number;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const appDispatch = useAppDispatch();
  const dispatch = useThunkDispatch();

  const adminCategories: AdminCategory[] = [
    {
      id: 0,
      name: "사용자 관리",
      isSelected: pathname === ADMIN_ROUTE,
      onClick: () => {
        router.push(ADMIN_ROUTE);
        appDispatch(changeCategory(undefined));
      },
    },
    {
      id: 1,
      name: "메뉴 관리",
      isSelected: pathname === CATEGORY_ROUTE,
      onClick: () => {
        router.push(CATEGORY_ROUTE);
        appDispatch(changeCategory(undefined));
      },
    },
  ];

  const { role, selectedCategoryName, categories } = useAppSelector(
    (state) => ({
      role: state.token.role,
      selectedCategoryName: state.category.selectedCategoryName,
      categories: state.category.get.categories,
    }),
    shallowEqual,
  );

  const handleChangeCategory = (categoryName: string) => {
    appDispatch(changeCategory(categoryName));
    router.push(HOME_ROUTE);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div
      className="fixed flex h-screen w-200 flex-col border-r-1 border-r-anti-flash-white
        bg-cultured p-5"
    >
      {categories &&
        categories.map(({ id, categoryNm }) => (
          <SideBarButton
            key={id}
            isSelected={categoryNm === selectedCategoryName}
            buttonName={categoryNm}
            onClick={() => {
              handleChangeCategory(categoryNm);
            }}
          />
        ))}
      {role === "SUPER_ADMIN" && (
        <div className="mb-1 mt-1 border-t-1 border-t-gainsboro"></div>
      )}
      {role === "SUPER_ADMIN" &&
        adminCategories.map(({ id, name, isSelected, onClick }) => (
          <SideBarButton
            key={id}
            isSelected={isSelected}
            buttonName={name}
            onClick={onClick}
          />
        ))}
    </div>
  );
}
