import React, { PropsWithChildren } from "react";

import { cn } from "@/utils/classname";

type Columns = {
  cols: { title: string; ratio?: number }[];
  ratio?: number[];
  className?: string;
};

interface Props extends PropsWithChildren {
  columns: Columns;
  isLoading?: boolean;
}

export default function DataTable(props: Props) {
  const { columns, isLoading = false, children } = props;

  if (!columns) throw new Error("<CustomTable /> columns is required.");

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <table className="w-full">
        <colgroup>
          {columns.cols.map(({ ratio }, index) => (
            <col key={index} width={`${ratio}%`} />
          ))}
        </colgroup>

        <thead>
          <tr
            className={cn(
              "border-b-2 border-b-sonic-silver",
              columns.className,
            )}
          >
            {columns.cols.map(({ title }, index) => (
              <th key={index} className="py-10 text-center">
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </>
  );
}
