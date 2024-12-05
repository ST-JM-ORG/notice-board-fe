import React, { ChangeEvent, FocusEvent } from "react";

interface Props {
  className?: string;
  type?: string;
  text: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

const Input = (props: Props) => {
  const { className, type = "text", text, value, onChange, onBlur } = props;

  return (
    <div className={className}>
      <div className="relative">
        <input
          id="input"
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="border-silver-sand focus:border-azure dark:bg-sonic-silver peer box-border
            w-full rounded-10 border-1 bg-white px-16 pb-8 pt-20 transition-colors
            duration-200 ease-in-out focus:border-1 focus:outline-none dark:text-white"
        />
        <label
          htmlFor="input"
          className="text-sonic-silver peer-focus:-translate-y-20p peer-focus:text-azure
            peer-[:not(input[value=''])]:-translate-y-20p pointer-events-none absolute
            bottom-0 left-3 top-0 flex items-center text-15 transition-all duration-200
            ease-in-out peer-focus:text-12 peer-[:not(input[value=''])]:text-12"
        >
          <div className="text-philippine-gray bg-transparent px-5 dark:text-anti-flash-white">
            {text}
          </div>
        </label>
      </div>
    </div>
  );
};

export default Input;
