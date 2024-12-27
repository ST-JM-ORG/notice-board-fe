"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoPerson } from "react-icons/io5";

import { useRouter } from "next/navigation";

import useOutsideClick from "@hook/use-outside-click";

import { TokenPayload } from "@models/token";

import { useAppDispatch } from "@redux/hook";
import { logout } from "@redux/modules/auth/login-slice";

import { cn } from "@utils/classname";
import { pxToRem } from "@utils/size";
import { decodeAccessToken } from "@utils/token";

export default function Header() {
  const router = useRouter();
  const appDispatch = useAppDispatch();

  const ref = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const [token, setToken] = useState<TokenPayload | null>(null);

  const menuRef = useOutsideClick<HTMLDivElement>(() => setOpen(false));

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
    appDispatch(logout(null));
  };

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const decodedToken = decodeAccessToken();
    if (decodedToken) {
      setToken(decodedToken);
    }
  }, []);

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
            "box-border h-full w-full rounded-1/2 bg-gainsboro p-5 shadow-xl backdrop-blur",
            "hover:bg-anti-flash-white",
            "transition-colors duration-200 ease-in-out",
          )}
          onClick={handleSwitchProfileButton}
        >
          {!token || !token.profileImg ? (
            <IoPerson />
          ) : (
            <img
              src={process.env.NEXT_PUBLIC_BASE_URL + token.profileImg}
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
                {!token || !token.profileImg ? (
                  <div className="rounded-1/2 bg-white p-10">
                    <IoPerson />
                  </div>
                ) : (
                  <img
                    src={process.env.NEXT_PUBLIC_BASE_URL + token.profileImg}
                    className="h-full w-full"
                  />
                )}
              </div>
              <p className="mt-5 w-full text-center font-bold">
                안녕하세요! {token && token.name}님
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
