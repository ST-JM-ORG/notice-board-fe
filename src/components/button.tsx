import React, { PropsWithChildren } from "react";

import { cn } from "@/utils/classname";

interface Props extends PropsWithChildren {
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  bgColor?: string;
  borderColor?: string;
  onClick?: () => void;
}

const Button = (props: Props) => {
  const { type, className, bgColor, borderColor, onClick, children } = props;

  return (
    <button
      type={type}
      className={cn(
        `rounded-10 border-1 px-8 py-4 shadow-xl backdrop-blur-md transition-all
        duration-200 ease-in-out`,
        "hover:bg-opacity-80",
        bgColor ? bgColor : "bg-platinum",
        borderColor ? borderColor : "border-silver-sand",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
