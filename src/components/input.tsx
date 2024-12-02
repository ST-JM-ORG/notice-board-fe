import React, { HTMLInputTypeAttribute } from "react";

type Props = {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
};

const Input = (props: Props) => {
  const { type, placeholder, className } = props;

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${className} w-full rounded-10 border-1 p-10`}
    />
  );
};

export default Input;
