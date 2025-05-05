import { ReactNode } from "react";

import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import ReduxProvider from "@/src/provider/redux-provider";
import ToastProvider from "@/src/provider/toast-provider";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Notice Board",
  description: "Let's create your notice!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} relative font-pretendard antialiased`}
      >
        <ReduxProvider>
          <ToastProvider>{children}</ToastProvider>
        </ReduxProvider>
        <div id="noti"></div>
        <div id="modal"></div>
      </body>
    </html>
  );
}
