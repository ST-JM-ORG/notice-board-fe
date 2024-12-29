"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { shallowEqual } from "react-redux";

import { useRouter } from "next/navigation";

import useOutsideClick from "@hook/use-outside-click";

import { logout } from "@redux/apis/auth-api";
import { useAppDispatch, useAppSelector, useThunkDispatch } from "@redux/hook";
import { resetAuth } from "@redux/modules/auth-slice";
import { getProfileImg } from "@redux/modules/token-slice";

import { cn } from "@utils/classname";
import { pxToRem } from "@utils/size";

export default function Header() {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const dispatch = useThunkDispatch();

  const ref = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const menuRef = useOutsideClick<HTMLDivElement>(() => setOpen(false));

  const { token, profileImg, username, logoutStatus } = useAppSelector(
    (state) => ({
      token: state.token.token,
      profileImg: state.token.profileImg,
      username: state.token.username,
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
    appDispatch(getProfileImg(null));
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
    <div
      className="flex items-center justify-between border-b-1 border-b-gainsboro bg-white p-10
        shadow-md"
    >
      <h2
        className={cn("p-5 text-20 font-bold", "hover:cursor-pointer")}
        onClick={handleGoHomePage}
      >
        Notice Board
      </h2>
      <div className="relative h-40 w-40">
        <button
          ref={ref}
          className={cn(
            `box-border flex h-full w-full items-center justify-center rounded-1/2
            bg-gainsboro p-5 shadow-xl backdrop-blur`,
            "hover:bg-anti-flash-white",
            "transition-colors duration-200 ease-in-out",
          )}
          onClick={handleSwitchProfileButton}
        >
          {!profileImg ? (
            <IoPerson />
          ) : (
            <img
              alt="profile image"
              src={process.env.NEXT_PUBLIC_BASE_URL + profileImg}
              className="h-full w-full rounded-1/2 object-contain backdrop-blur"
            />
          )}
        </button>
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
            style={{ top: `${pxToRem(height + 5)}rem` }}
            onAnimationEnd={handleAnimatedEnd}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="h-40 w-40 rounded-1/2 border-1 border-gainsboro object-contain p-5 backdrop-blur">
                {!profileImg ? (
                  <div className="rounded-1/2 bg-white p-10">
                    <IoPerson />
                  </div>
                ) : (
                  <img
                    alt="profile image"
                    src={process.env.NEXT_PUBLIC_BASE_URL + profileImg}
                    className="h-full w-full rounded-1/2"
                  />
                )}
              </div>
              <p className="mt-5 w-full text-center font-bold">
                안녕하세요! {username}님
              </p>
            </div>
            <div className="flex flex-col">
              <button
                type="button"
                className={cn(
                  "mb-2 rounded-t-10 bg-white py-5 text-14",
                  "transition-colors duration-100 ease-in-out",
                  "hover:bg-gainsboro hover:bg-opacity-30",
                )}
                onClick={handleGoProfilePage}
              >
                내 정보
              </button>
              <button
                type="button"
                className={cn(
                  "rounded-b-10 bg-white py-5 text-14",
                  "transition-colors duration-100 ease-in-out",
                  "hover:bg-gainsboro hover:bg-opacity-30",
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
