import React, { useCallback, useState } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa6";

import useOutsideClick from "@/hook/use-outside-click";

import { cn } from "@/utils/classname";
import { pxToRem } from "@/utils/size";

interface Props {
  width?: number;
  options: string[];
  value: string | null | undefined;
  onClick: (value: string) => void;
}

export default function SelectBox({
  width = 100,
  options,
  value,
  onClick,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setOpen(false));

  const handleSwitchOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div className="relative h-40" style={{ width: `${pxToRem(width)}rem` }}>
      <button
        className={cn(
          `flex h-full w-full items-center justify-between space-x-2 rounded-20 border-1
          border-silver-sand pl-10 pr-10 shadow-google`,
        )}
        onClick={handleSwitchOpen}
      >
        <span>{value ? value : options[0]}</span>
        <FaAngleDown
          className={cn(
            "transition-transform duration-200 ease-in-out",
            open ? "rotate-180" : "rotate-0",
          )}
        />
      </button>
      {open && (
        <div
          ref={ref}
          className="absolute left-0 top-0 flex flex-col rounded-5 border-1 border-silver-sand
            bg-platinum p-2 shadow-google backdrop-blur"
          style={{ width: `${pxToRem(width)}rem` }}
        >
          {options &&
            options.map((option, index) => (
              <button
                key={index}
                className={cn(
                  "flex w-full items-center rounded-5 px-8 py-2 text-start",
                  "hover:cursor-pointer hover:bg-vivid-cerulean hover:font-bold hover:text-white",
                )}
                onClick={() => {
                  onClick(option);
                  setOpen(false);
                }}
              >
                <div className="w-15">
                  {value && value === option && <FaCheck className="text-12" />}
                </div>
                <span>{option}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
