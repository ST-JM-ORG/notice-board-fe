import React, { PropsWithChildren } from "react";

import { cn } from "@/src/shared/utils/classname";

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

export default function DataTableRow(props: Props) {
  const { className, onClick, children } = props;

  return (
    <tr
      className={cn(
        "border-b-1 border-b-silver-sand text-center",
        "hover:cursor-pointer hover:bg-blue-50",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}
