import React, { ChangeEvent, FocusEvent } from "react";

import { cn } from "@/utils/classname";

interface Props {
  id?: string;
  className?: string;
  type?: string;
  text: string;
  value: string | number | readonly string[] | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  helperText?: string | undefined | null;
  required?: boolean;
  disabled?: boolean;
}

const Input = (props: Props) => {
  const {
    id,
    className,
    type = "text",
    text,
    value,
    onChange,
    onBlur,
    helperText,
    required = false,
    disabled = false,
  } = props;

  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={cn(
            `peer box-border w-full rounded-10 border-1 border-silver-sand bg-white px-15
            pb-8 pt-20 transition-colors duration-200 ease-in-out`,
            "focus:border-1 focus:border-sonic-silver focus:outline-none",
            "dark:bg-sonic-silver dark:text-white",
            disabled ? "text-silver-sand" : "text-black",
          )}
        />
        <label
          htmlFor="input"
          className={cn(
            `pointer-events-none absolute bottom-0 left-10 top-0 flex items-center text-15
            text-sonic-silver transition-all duration-200 ease-in-out`,
            `peer-focus:-translate-y-20p peer-focus:text-12 peer-focus:text-sonic-silver
            peer-[:not(input[value=''])]:-translate-y-20p
            peer-[:not(input[value=''])]:text-12`,
          )}
        >
          <div
            className={cn(
              "bg-transparent px-5 text-sonic-silver",
              "dark:text-anti-flash-white",
            )}
          >
            {text}
            {required && <span className="ml-3">*</span>}
          </div>
        </label>
      </div>
      <p className="px-5 text-13 text-red">{helperText}</p>
    </div>
  );
};

export default Input;
