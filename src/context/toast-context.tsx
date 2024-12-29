import {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { nanoid } from "nanoid";

import ToastContainer from "@context/toast-container";

// const TOAST_MAX_COUNT = 5;

type ToastInput = {
  heading: string;
  message: string;
  duration?: number;
};

type ToastData = {
  id: string;
  heading: string;
  message: string;
  type: "info" | "success" | "warn" | "error";
  duration?: number;
};

export interface ToastContextType {
  success: (value: ToastInput) => void;
  warning: (value: ToastInput) => void;
  info: (value: ToastInput) => void;
  error: (value: ToastInput) => void;
}

export const ToastContext = createContext<ToastContextType>({
  success: () => {},
  warning: () => {},
  info: () => {},
  error: () => {},
});

export default function ToastContextProvider(props: PropsWithChildren) {
  const { children } = props;

  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [element, setElement] = useState<Element | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);

  // Toast 알림 배열에 추가
  const handleAddToast = ({
    toast,
    type,
  }: {
    toast: ToastInput;
    type: "info" | "success" | "warn" | "error";
  }) => {
    const id = nanoid();
    const newToast: ToastData = { ...toast, type, id, duration: 2 };

    // Toast 메시지는 최대 TOAST_MAX_COUNT 개까지만 출력됨
    // if (toasts.length >= TOAST_MAX_COUNT) {
    //   const toastTemp = toasts.slice(0, TOAST_MAX_COUNT - 1);
    //   setToasts([newToast, ...toastTemp]);
    // } else {
    //   setToasts([newToast, ...toasts]);
    // }
    setToasts([newToast, ...toasts]);
  };

  const info = (data: ToastInput) => {
    handleAddToast({ toast: data, type: "info" });
  };

  const success = (data: ToastInput) => {
    handleAddToast({ toast: data, type: "success" });
  };

  const warning = (data: ToastInput) => {
    handleAddToast({ toast: data, type: "warn" });
  };

  const error = (data: ToastInput) => {
    handleAddToast({ toast: data, type: "error" });
  };

  // Toast 알림 삭제
  const handleRemoveToast = (id: string) => {
    setToasts([...toasts.filter((toast) => toast.id !== id)]);

    if (toasts.length < 1 && ref.current) {
      while (ref.current.firstChild) {
        ref.current.removeChild(ref.current.firstChild);
      }
    }
  };

  useEffect(() => {
    const el = document.querySelector("#noti");
    if (el) setElement(el);
  }, []);

  if (!element) return;

  return (
    <ToastContext.Provider value={{ success, warning, info, error }}>
      {children}
      {createPortal(
        <div
          className="fixed right-0 top-0 mr-5 mt-[3.75rem] space-y-1"
          ref={ref}
        >
          {toasts.map(({ id, type, heading, duration, message }) => (
            <ToastContainer
              key={id}
              type={type}
              heading={heading}
              message={message}
              duration={duration}
              onClick={() => handleRemoveToast(id)}
            />
          ))}
        </div>,
        element,
      )}
    </ToastContext.Provider>
  );
}
