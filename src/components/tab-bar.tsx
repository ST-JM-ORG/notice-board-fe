import React, { PropsWithChildren } from "react";

export default function TabBar(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="flex w-full justify-between rounded-30 bg-white">
      {children}
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
