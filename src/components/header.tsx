"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoPerson } from "react-icons/io5";

import { useRouter } from "next/navigation";

import useOutsideClick from "@hook/use-outside-click";

import { useAppDispatch } from "@redux/hook";
import { logout } from "@redux/modules/auth-slice";

import { cn } from "@utils/classname";
import { pxToRem } from "@utils/size";

export default function Header() {
  const router = useRouter();
  const appDispatch = useAppDispatch();

  const ref = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const handleGoHome = () => {
    router.push("/");
  };

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

  const handleLogout = () => {
    appDispatch(logout(null));
  };

  const menus: { text: string; cb: () => void }[] = [
    { text: "내 정보", cb: () => router.push("/profile") },
    { text: "로그아웃", cb: handleLogout },
  ];

  useOutsideClick(ref, handleSwitchProfileButton);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, []);

  return (
    <div
      className="flex items-center justify-between border-b-1 border-b-gainsboro bg-white p-10
        shadow-md"
    >
      <h2
        className={cn("p-5 text-20 font-bold", "hover:cursor-pointer")}
        onClick={handleGoHome}
      >
        Notice Board
      </h2>
      <div className="relative">
        <button
          ref={ref}
          className={cn(
            "rounded-1/2 bg-gainsboro p-10 shadow-xl backdrop-blur",
            "hover:bg-anti-flash-white",
            "transition-colors duration-200 ease-in-out",
          )}
          onClick={handleSwitchProfileButton}
        >
          <IoPerson />
        </button>
        {animation && (
          <div
            className={cn(
              `absolute right-10 flex w-200 flex-col rounded-10 border-1 border-gainsboro
              bg-platinum bg-opacity-50 py-10 shadow-xl backdrop-blur`,
              open
                ? "animate-slide-top-right-in"
                : "animate-slide-top-right-out",
            )}
            style={{ top: `${pxToRem(height + 5)}rem` }}
            onAnimationEnd={handleAnimatedEnd}
          >
            {menus.map(({ text, cb }, index) => (
              <button key={index} type="button" onClick={cb}>
                {text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
