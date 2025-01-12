import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { IoAlertCircle } from "react-icons/io5";

import Button from "@/components/button";

import useOutsideClick from "@/hook/use-outside-click";

import { cn } from "@/utils/classname";

interface Props {
  open: boolean;
  message?: string;
  onClose: () => void;
  onOk: () => void;
}

export default function ConfirmModal({ open, message, onClose, onOk }: Props) {
  const [element, setElement] = useState<Element | null>(null);
  const [animated, setAnimated] = useState<boolean>(true);

  const handleModalClose = () => {
    setAnimated(false);
  };

  const handleAnimationEnd = () => {
    if (!animated) {
      onClose();
    }
  };

  const ref = useOutsideClick<HTMLDivElement>(handleModalClose);

  useEffect(() => {
    const el = document.querySelector("#modal");
    if (el) setElement(el);
  }, []);

  if (!element) return null;
  if (!open) return null;

  return createPortal(
    <div
      className={cn(
        `absolute left-0 top-0 flex h-screen w-full items-center justify-center
        bg-anti-flash-white bg-opacity-50`,
        animated
          ? "animate-modal-background-up"
          : "animate-modal-background-down",
      )}
    >
      <div
        ref={ref}
        className={cn(
          `flex w-[25rem] flex-col rounded-20 border-1 border-gainsboro bg-platinum
          bg-opacity-50 p-20 shadow-google backdrop-blur`,
          animated ? "animate-modal-slide-up" : "animate-modal-slide-down",
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <header className="flex justify-end">
          <button
            className={cn(
              "rounded-1/2 p-5 transition-colors duration-200 ease-in-out",
              "hover:bg-anti-flash-white",
            )}
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </header>
        <section className="flex flex-col items-center justify-center space-y-3">
          <IoAlertCircle className="h-70 w-70 text-pastel-red" />
          <div className="mt-10 text-25 font-bold">알림</div>
          <div className="text-16">{message}</div>
        </section>
        <footer className="mt-20 flex w-full items-center justify-center space-x-1">
          <Button
            className="w-full bg-anti-flash-white py-10 font-bold"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            className="w-full border-1 border-light-salmon-pink bg-pastel-red py-10 font-bold
              text-white shadow-google"
            onClick={onOk}
          >
            삭제
          </Button>
        </footer>
      </div>
    </div>,
    element,
  );
}
