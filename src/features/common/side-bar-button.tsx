import React from "react";

import { cn } from "@/src/shared/utils/classname";

interface Props {
  isSelected: boolean;
  buttonName: string;
  onClick?: () => void;
}

export default function SideBarButton({
  isSelected,
  buttonName,
  onClick,
}: Props) {
  return (
    <button
      className={cn(
        `group flex w-full items-center justify-between rounded-10 p-10 text-start
        transition-colors duration-200 ease-in-out`,
        "hover:cursor-pointer hover:bg-gainsboro",
        isSelected && "underline",
      )}
      onClick={onClick}
    >
      {buttonName}
      {isSelected && (
        <div
          className={cn(
            "h-10 w-10 rounded-5 bg-silver-sand",
            "group-hover:bg-white",
          )}
        ></div>
      )}
    </button>
  );
}
