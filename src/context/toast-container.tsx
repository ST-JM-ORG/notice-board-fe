"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { GoAlert } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";

import { cn } from "@/utils/classname";

interface Props extends PropsWithChildren {
  className?: string;
  type: "info" | "success" | "warn" | "error";
  heading: string;
  message: string;
  duration?: number;
  onClick: () => void;
}

export default function ToastContainer(props: Props) {
  const { className, type, heading, message, duration = 2, onClick } = props;

  const [show, setShow] = useState<boolean>(true);

  const handleCloseToast = () => {
    setShow(false);
  };

  const handleAnimationEnd = () => {
    if (!show) {
      onClick();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createTimer = (): Promise<ReturnType<typeof setTimeout>> => {
    return new Promise(() =>
      setTimeout(
        () => {
          setShow(false);
        },
        duration * (1000 + 50),
      ),
    );
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const startTimer = async () => {
      timer = await createTimer(); // 타이머 비동기로 생성
    };
    startTimer();
    return () => clearTimeout(timer);
  }, [createTimer]);

  return (
    <div
      className={cn(
        `z-[98] flex w-300 items-start space-x-2 rounded-5 border-l-3 bg-opacity-50 p-10
        backdrop-blur`,
        type === "info" &&
          "border-l-brandeis-blue bg-sky-blue after:border-brandeis-blue",
        type === "success" &&
          "border-l-salem bg-light-green after:border-salem",
        type === "warn" &&
          "border-l-bright-yellow bg-dandelion after:border-bright-yellow",
        type === "error" &&
          "border-l-pastel-red bg-light-salmon-pink after:border-pastel-red",
        show ? "animate-fade-in opacity-100" : "animate-fade-out opacity-0",
        `after:absolute after:bottom-0 after:left-0 after:animate-progress-in
        after:border-b-1 after:border-l-[9.125rem] after:border-r-[9.125rem]
        after:border-t-1`,
        className,
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="flex-none pt-4">
        {type === "info" && (
          <IoMdNotificationsOutline className="h-20 w-20 text-brandeis-blue" />
        )}
        {type === "success" && <FaCheck className="h-20 w-20 text-salem" />}
        {type === "warn" && (
          <GoAlert className="h-20 w-20 text-bright-yellow" />
        )}
        {type === "error" && (
          <MdOutlineErrorOutline className="h-20 w-20 text-pastel-red" />
        )}
      </div>

      <section
        className={cn(
          "w-full shrink",
          type === "info" && "text-brandeis-blue",
          type === "success" && "text-salem",
          type === "warn" && "text-bright-yellow",
          type === "error" && "text-pastel-red",
        )}
      >
        <h2 className="text-16 font-bold">{heading}</h2>
        <p className="text-14">{message}</p>
      </section>

      <button type="button" className="flex-none" onClick={handleCloseToast}>
        <IoCloseOutline />
      </button>
    </div>
  );
}
