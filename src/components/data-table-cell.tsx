import React, { PropsWithChildren } from "react";

import { cn } from "@/utils/classname";

interface Props extends PropsWithChildren {
  className?: string;
}

export default function DataTableCell(props: Props) {
  const { className, children } = props;

  return <td className={cn("py-10", className)}>{children}</td>;
}
