"use client";

import React, { useEffect, useRef, useState } from "react";
import { shallowEqual } from "react-redux";

import { useRouter } from "next/navigation";

import useOutsideClick from "@/hook/use-outside-click";

import { useAppDispatch, useAppSelector, useThunkDispatch } from "@/redux/hook";
import { resetAuth } from "@/redux/modules/auth-slice";
import { saveToken } from "@/redux/modules/token-slice";

import ProfileImage from "@/src/features/common/profile-image";
import { logout } from "@/src/services/auth/auth-api";
import { cn } from "@/src/shared/utils/classname";
import { adminRole } from "@/src/shared/utils/role";
import { pxToRem } from "@/src/shared/utils/size";

export default function Header() {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const dispatch = useThunkDispatch();

  const ref = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const menuRef = useOutsideClick<HTMLDivElement>(() => setOpen(false));

  const { token, profileImg, username, role, logoutStatus } = useAppSelector(
    (state) => ({
      token: state.token.token,
      profileImg: state.token.profileImg,
      username: state.token.username,
      role: state.token.role,
      logoutStatus: state.auth.logout.status,
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

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    appDispatch(saveToken(null));
  }, [token, appDispatch]);

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
    <header
      className="shadow-m flex items-center justify-between border-b-1 border-b-gainsboro
        bg-white p-10"
    >
      <div className="mx-auto flex w-full justify-between">
        <h2
          className={cn("p-5 text-20 font-bold", "hover:cursor-pointer")}
          onClick={handleGoHomePage}
        >
          Notice Board
        </h2>
        <div className="relative h-40 w-40">
          <ProfileImage
            ref={ref}
            src={profileImg}
            className="hover:cursor-pointer"
            clickable={true}
            onClick={handleSwitchProfileButton}
          />
          {animation && (
            <div
              ref={menuRef}
              className={cn(
                `absolute right-10 z-[99] flex w-200 flex-col space-y-2 rounded-10 border-1
                border-gainsboro bg-platinum bg-opacity-50 p-5 shadow-xl backdrop-blur`,
                open
                  ? "animate-slide-top-right-in"
                  : "animate-slide-top-right-out",
              )}
              style={{ top: `${pxToRem(height)}rem` }}
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
    </header>
  );
}
