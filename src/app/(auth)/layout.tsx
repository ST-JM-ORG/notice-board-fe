import React, { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div className="border-box flex h-screen w-full items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
