import React, { PropsWithChildren } from "react";

import Header from "@components/header";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <main className="h-full w-full">
      <Header />
      {children}
    </main>
  );
}
