import React, { ChangeEvent } from "react";

interface Props {
  label: string;
  name?: string;
  value: string | number;
  groupValue: string | number;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioButton(props: Props) {
  const { label, name, value, groupValue, onChange } = props;

  return (
    <div className="inline">
      <input
        id={label}
        name={name}
        type="radio"
        value={value}
        checked={groupValue === value}
        onChange={onChange}
      />
      <label htmlFor={label} className="ml-2">
        {label}
      </label>
    </div>
  );
}
