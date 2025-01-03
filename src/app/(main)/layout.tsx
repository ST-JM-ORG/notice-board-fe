import React, { PropsWithChildren } from "react";

import Header from "@/components/header";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <main className="h-full w-full">
      <Header />
      <div className="mx-auto mt-30 max-w-[80rem] px-10">{children}</div>
    </main>
  );
}
