import React, { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

import useOutsideClick from "@/hook/use-outside-click";

import { cn } from "@/utils/classname";
import { pxToRem } from "@/utils/size";

interface Props extends PropsWithChildren {
  title?: string;
  open: boolean;
  onClose: () => void;
  width?: number;
  height?: number;
  className?: string;
}

export default function Modal(props: Props) {
  const {
    title,
    open,
    onClose,
    width = 500,
    height = 500,
    className,
    children,
  } = props;

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
    setAnimated(open);
    return setAnimated(true);
  }, [open]);

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
          "rounded-20 border-1 border-gainsboro bg-white p-20",
          animated ? "animate-modal-slide-up" : "animate-modal-slide-down",
        )}
        style={{
          width: `${pxToRem(width)}rem`,
          height: `${pxToRem(height)}rem`,
        }}
        onAnimationEnd={handleAnimationEnd}
      >
        <div
          className={cn("mb-5 flex", title ? "justify-between" : "justify-end")}
        >
          {title && <h1>{title}</h1>}
          <button
            className={cn(
              "rounded-1/2 p-5 transition-colors duration-200 ease-in-out",
              "hover:bg-anti-flash-white",
            )}
          >
            <IoMdClose />
          </button>
        </div>
        <div className={cn("w-full", className)}>{children}</div>
      </div>
    </div>,
    element,
  );
}
