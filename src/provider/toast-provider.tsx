"use client";

import React, { PropsWithChildren } from "react";

import ToastContextProvider from "@context/toast-context";

export default function ToastProvider({ children }: PropsWithChildren) {
  return <ToastContextProvider>{children}</ToastContextProvider>;
}
