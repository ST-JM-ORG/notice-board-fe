import React, { ReactElement } from "react";

import { cn } from "@utils/classname";

interface Props<T> {
  icon?: ReactElement;
  text: string;
  groupValue: T;
  value: T;
  onChangeValue: (value: T) => void;
}

export default function TabBarButton<T>(props: Props<T>) {
  const { icon, text, groupValue, value, onChangeValue } = props;

  return (
    <button
      className={cn(
        "flex w-full items-center justify-center space-x-1 rounded-20 p-10 text-center",
        groupValue === value && "bg-gainsboro",
      )}
      onClick={() => onChangeValue(value)}
    >
      {icon && icon}
      <span>{text}</span>
    </button>
  );
}
