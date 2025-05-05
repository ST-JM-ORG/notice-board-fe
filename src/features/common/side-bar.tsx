"use client";

import React, { useEffect, useRef, useState } from "react";
import { shallowEqual } from "react-redux";

import { usePathname, useRouter } from "next/navigation";

import useOutsideClick from "@/hook/use-outside-click";

import { useAppDispatch, useAppSelector, useThunkDispatch } from "@/redux/hook";
import { resetAuth } from "@/redux/modules/auth-slice";
import { changeCategory } from "@/redux/modules/category-slice";
import { saveToken } from "@/redux/modules/token-slice";

import ProfileImage from "@/src/features/common/profile-image";
import SideBarButton from "@/src/features/common/side-bar-button";
import { logout } from "@/src/services/auth-api";
import { getCategories } from "@/src/services/category-api";
import { cn } from "@/src/shared/utils/classname";
import { adminRole } from "@/src/shared/utils/role";
import {
  ADMIN_ROUTE,
  CATEGORY_ROUTE,
  HOME_ROUTE,
} from "@/src/shared/utils/routes";
import { pxToRem } from "@/src/shared/utils/size";

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

  const { token, profileImg, logoutStatus } = useAppSelector(
    (state) => ({
      token: state.token.token,
      profileImg: state.token.profileImg,
      logoutStatus: state.auth.logout.status,
    }),
    shallowEqual,
  );

  const ref = useRef<HTMLDivElement | null>(null);
  const menuRef = useOutsideClick<HTMLDivElement>(() => setOpen(false));

  const [open, setOpen] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

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

  const { role, selectedCategoryName, categories, username } = useAppSelector(
    (state) => ({
      role: state.token.role,
      selectedCategoryName: state.category.selectedCategoryName,
      categories: state.category.get.categories,
      username: state.token.username,
    }),
    shallowEqual,
  );

  const handleSwitchProfileButton = () => {
    setOpen(!open);
    if (!open) {
      setAnimation(true);
    }
  };

  const handleAnimatedEnd = () => {
    if (!open) {
      setAnimation(false);
    }
  };

  const handleGoHomePage = () => {
    router.push("/");
  };

  const handleGoProfilePage = () => {
    setOpen(false);
    router.push("/profile");
  };

  const handleGoAdminPage = () => {
    setOpen(false);
    router.push("/admin");
  };

  const handleLogout = () => {
    setOpen(false);
    dispatch(logout(null));
  };

  const handleChangeCategory = (categoryName: string) => {
    appDispatch(changeCategory(categoryName));
    router.push(HOME_ROUTE);
  };

  useEffect(() => {
    appDispatch(saveToken(null));
  }, [token, appDispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (logoutStatus === "fulfilled" || logoutStatus === "rejected") {
      router.replace("/login");
    }
  }, [logoutStatus]);

  useEffect(() => {
    return () => {
      appDispatch(resetAuth("logout"));
    };
  }, [appDispatch]);

  return (
    <div className="flex h-screen w-250 flex-col justify-between bg-cultured p-5">
      <div className="flex flex-col justify-start">
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

      <div ref={ref} className="border-t-1 border-t-gainsboro p-10">
        <button
          className={cn(
            `flex w-full items-center justify-between rounded-20 pr-10 transition-all
            duration-200 ease-in-out`,
            "hover:bg-american-silver hover:bg-opacity-30",
          )}
          onClick={handleSwitchProfileButton}
        >
          <ProfileImage size={40} src={profileImg} />
          <div>{username}</div>
        </button>
        {animation && (
          <div
            ref={menuRef}
            className={cn(
              `absolute left-10 z-[99] flex w-200 flex-col space-y-2 rounded-10 border-1
              border-gainsboro bg-platinum bg-opacity-50 p-5 shadow-xl backdrop-blur`,
              open ? "animate-profile-fade-in" : "animate-profile-fade-out",
            )}
            style={{ bottom: `${pxToRem(height)}rem` }}
            onAnimationEnd={handleAnimatedEnd}
          >
            <div className="flex flex-col items-center justify-center">
              <ProfileImage src={profileImg} size={40} />
              <p className="mt-5 w-full text-center font-bold">
                안녕하세요! {username}님
              </p>
            </div>
            <div className="flex flex-col">
              <button
                type="button"
                className={cn(
                  `mb-2 rounded-t-10 bg-white bg-opacity-70 py-5 text-14 backdrop-blur
                  transition-colors duration-100 ease-in-out`,
                  "hover:bg-gainsboro",
                )}
                onClick={handleGoProfilePage}
              >
                내 정보
              </button>
              {adminRole(role) && (
                <button
                  type="button"
                  className={cn(
                    `mb-2 bg-white bg-opacity-70 py-5 text-14 backdrop-blur transition-colors
                    duration-100 ease-in-out`,
                    "hover:bg-gainsboro",
                  )}
                  onClick={handleGoAdminPage}
                >
                  사용자 관리
                </button>
              )}
              <button
                type="button"
                className={cn(
                  `rounded-b-10 bg-white bg-opacity-70 py-5 text-14 backdrop-blur transition-colors
                  duration-100 ease-in-out`,
                  "hover:bg-gainsboro",
                )}
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
