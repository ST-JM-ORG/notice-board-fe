import { RefObject, useEffect } from "react";

/**
 * ref 외부의 요소를 클릭했을 경우 실행할 콜백 함수를 등록합니다.
 */
export default function useOutsideClick(
  ref: RefObject<HTMLElement>,
  callback?: (event?: Event) => void,
): void {
  useEffect(() => {
    const handleClickOutside = (e: Event): void => {
      if (ref.current === null || ref.current.contains(e.target as Node)) {
        return;
      }
      callback?.(e); // 모달 외부 요소 클릭 시 실행
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback]);
}
