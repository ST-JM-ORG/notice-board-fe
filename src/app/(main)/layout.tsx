import React, { PropsWithChildren } from "react";

import Header from "@/components/header";
import SideBar from "@/components/side-bar";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <main className="h-full w-full">
      <Header />
      <SideBar />
      <div className="mx-auto mt-30 max-w-[80rem] px-10 pl-[13.125rem]">
        {children}
      </div>
    </main>
  );
}
