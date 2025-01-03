import React, { cloneElement, ReactElement, useEffect, useState } from "react";

import { cn } from "@/utils/classname";

interface Props {
  tabIndex: number;
  items: { icon?: ReactElement; text: string }[];
  onChangeValue: (value: number) => void;
}

export default function TabBar(props: Props) {
  const { tabIndex, items, onChangeValue } = props;

  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    setLength(items.length);
  }, [items]);

  return (
    <div
      className="relative flex w-full justify-between rounded-30 bg-platinum bg-opacity-30
        backdrop-blur"
    >
      <div
        className={cn(
          `absolute left-0 top-0 box-border flex h-full items-center justify-center
          rounded-30 bg-baby-blue-eyes`,
          "transition-transform duration-200 ease-in-out",
        )}
        style={{
          width: `${100 / length}%`,
          transform: `translateX(${100 * tabIndex}%)`,
        }}
      />
      {items.map(({ icon, text }, index) => (
        <button
          key={index}
          className={cn(
            "flex w-full items-center justify-center space-x-1 rounded-20 p-10 text-center",
            index === tabIndex ? "font-bold text-black" : "text-gray-500",
          )}
          onClick={() => onChangeValue(index)}
        >
          {icon && cloneElement(icon, { className: "z-[99]" })}
          <span className="z-[99]">{text}</span>
        </button>
      ))}
      {/*{children}*/}
      {/*{Children.map(children, (child, index) =>*/}
      {/*  cloneElement(child as ReactElement, {*/}
      {/*    style: {*/}
      {/*      ...(child as ReactElement).props.style,*/}
      {/*      backgroundColor: selected === index ? "#bdecb6" : "transparent",*/}
      {/*      borderRadius: `${pxToRem(30)}rem`,*/}
      {/*      padding: `${pxToRem(10)}rem`,*/}
      {/*      backdropFilter: `blur(${pxToRem(10)}rem)`,*/}
      {/*    },*/}
      {/*    ...(child as ReactElement).props,*/}
      {/*  }),*/}
      {/*)}*/}
    </div>
  );
}
