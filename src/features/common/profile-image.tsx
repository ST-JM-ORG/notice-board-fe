import React, { LegacyRef } from "react";
import { IoPerson } from "react-icons/io5";

import { cn } from "@/src/shared/utils/classname";

interface Props {
  ref?: LegacyRef<HTMLDivElement>;
  src?: string | null | undefined;
  size?: number;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

export default function ProfileImage({
  ref,
  size,
  src,
  className,
  clickable = false,
  onClick,
}: Props) {
  return (
    <div
      ref={ref}
      className={cn(
        `box-border flex items-center justify-center rounded-1/2 bg-gainsboro shadow-xl
        transition-colors duration-200 ease-in-out`,
        className,
      )}
      style={{
        width: size || "100%",
        height: size || "100%",
      }}
      onClick={onClick}
    >
      {!src ? (
        <div
          className={cn(
            `flex h-full w-full items-center justify-center rounded-1/2 bg-gainsboro
              transition-colors duration-200 ease-in-out`,
            clickable && "hover:bg-american-silver",
          )}
        >
          <IoPerson />
        </div>
      ) : (
        <img
          alt="profile image"
          src={process.env.NEXT_PUBLIC_BASE_URL + src}
          className="h-full w-full rounded-1/2 object-contain"
        />
      )}
    </div>
  );
}
