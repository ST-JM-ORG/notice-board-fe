import { RefObject, useEffect, useRef } from "react";

/**
 * ref 외부의 요소를 클릭했을 경우 실행할 콜백 함수를 등록합니다.
 */
export default function useOutsideClick<T extends HTMLElement>(
  callback: () => void,
): RefObject<T> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback(); // 모달 외부 요소 클릭 시 실행
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callback]);

  return ref;
}
