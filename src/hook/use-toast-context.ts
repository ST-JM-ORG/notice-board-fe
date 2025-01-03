import { useContext } from "react";

import { ToastContext, ToastContextType } from "@/context/toast-context";

const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToastContext must be used within a ToastContextProvider",
    );
  }
  return context;
};

export default useToastContext;
