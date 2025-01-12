import React, { ChangeEvent, FocusEvent } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

import { cn } from "@/utils/classname";

interface Props {
  id?: string;
  className?: string;
  type?: string;
  value: string | number | readonly string[] | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  helperText?: string | undefined | null;
  disabled?: boolean;
}

const SearchInput = ({
  id,
  className,
  type = "text",
  value,
  onChange,
  onBlur,
  helperText,
  disabled = false,
}: Props) => {
  return (
    <div
      className={cn(
        `shadow-google relative h-40 w-200 rounded-20 bg-transparent transition-width
        duration-200 ease-in-out`,
        "focus-within:w-400",
        className,
      )}
    >
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder="검색어를 입력하세요"
        className={cn(
          `peer box-border h-40 w-full rounded-20 border-1 border-silver-sand bg-white py-5
          pl-20 pr-60 transition-colors duration-200 ease-in-out`,
          "focus:border-1 focus:border-sky-blue focus:outline-none",
          "placeholder:text-14",
          disabled ? "text-silver-sand" : "text-black",
        )}
      />
      <button
        className={cn(
          `absolute right-40 top-1/2 -translate-y-1/2 rounded-1/2 p-2 transition-all
          duration-200 ease-in-out`,
        )}
      >
        <IoClose className="text-sonic-silver" />
      </button>
      <button
        className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center
          border-l-1 border-l-american-silver px-5 text-white"
      >
        <IoSearch className="text-20 text-sky-blue" />
      </button>
      <p className="px-5 text-13 text-red">{helperText}</p>
    </div>
  );
};

export default SearchInput;
