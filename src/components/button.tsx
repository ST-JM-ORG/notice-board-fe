import React, { PropsWithChildren } from "react";

import { cn } from "@utils/classname";

interface Props extends PropsWithChildren {
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  onClick?: () => void;
}

const Button = (props: Props) => {
  const { type, className, onClick, children } = props;

  return (
    <button
      type={type}
      className={cn(
        `bg-platinum rounded-10 border-1 border-silver-sand px-8 py-4 shadow-xl
        backdrop-blur-md`,
        "transition-opacity duration-300 ease-in-out",
        "hover:bg-opacity-80",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
