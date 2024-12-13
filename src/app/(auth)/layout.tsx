import React, { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <main className="border-box flex h-screen w-full items-center justify-center">
      <div className="min-w-500 rounded-20 border-1 bg-anti-flash-white px-20 py-50 shadow-lg">
        {children}
      </div>
    </main>
  );
};

export default Layout;
