import React, { ChangeEvent, FocusEvent } from "react";

import { cn } from "@utils/classname";

interface Props {
  id?: string;
  className?: string;
  type?: string;
  text: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  helperText?: string | undefined | null;
  required?: boolean;
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
          className={cn(
            `peer box-border w-full rounded-10 border-1 border-silver-sand bg-white px-15
            pb-8 pt-20 transition-colors duration-200 ease-in-out`,
            "focus:border-azure focus:border-1 focus:outline-none",
            "dark:bg-sonic-silver dark:text-white",
          )}
        />
        <label
          htmlFor="input"
          className={cn(
            `pointer-events-none absolute bottom-0 left-10 top-0 flex items-center text-15
            text-sonic-silver`,
            "transition-all duration-200 ease-in-out",
            `peer-focus:text-azure peer-focus:-translate-y-20p peer-focus:text-12
            peer-[:not(input[value=''])]:-translate-y-20p
            peer-[:not(input[value=''])]:text-12`,
          )}
        >
          <div
            className={cn(
              "text-philippine-gray bg-transparent px-5",
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
