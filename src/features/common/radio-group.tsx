import React, { Children, cloneElement, PropsWithChildren, ReactElement } from "react";

interface Props extends PropsWithChildren {
  name: string;
  className?: string;
}

export default function RadioGroup(props: Props) {
  const { name, className, children } = props;

  return (
    <fieldset className={className}>
      {Children.map(children, (child, index) =>
        cloneElement(child as ReactElement, { name }),
      )}
    </fieldset>
  );
}
