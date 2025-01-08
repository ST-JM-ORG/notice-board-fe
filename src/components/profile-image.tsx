import React, { LegacyRef } from "react";
import { IoPerson } from "react-icons/io5";

import { cn } from "@/utils/classname";

interface Props {
  ref?: LegacyRef<HTMLDivElement>;
  src?: string | null | undefined;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function ProfileImage(props: Props) {
  const { ref, size, src, className, onClick } = props;

  return (
    <div
      ref={ref}
      className={cn(
        `box-border flex items-center justify-center rounded-1/2 bg-gainsboro p-2
        shadow-xl backdrop-blur transition-colors duration-200 ease-in-out`,
        className,
      )}
      style={{
        width: size || "100%",
        height: size || "100%",
      }}
      onClick={onClick}
    >
      {!src ? (
        <div className="rounded-1/2 bg-gainsboro p-10">
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
