import React, { PropsWithChildren } from "react";

import SideBar from "@/src/features/common/side-bar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-screen w-full bg-cultured">
      {/*<Header />*/}
      <SideBar />
      <div className="w-full bg-cultured pb-5 pr-5 pt-5">
        <div className="h-full rounded-5 bg-white p-16 shadow-google">
          {children}
        </div>
      </div>
    </main>
  );
}
