import React, { PropsWithChildren } from "react";

import { cn } from "@utils/classname";

interface Props extends PropsWithChildren {
  className?: string;
}

export default function DataTableRow(props: Props) {
  const { className, children } = props;

  return (
    <tr
      className={cn("border-b-1 border-b-silver-sand text-center", className)}
    >
      {children}
    </tr>
  );
}
