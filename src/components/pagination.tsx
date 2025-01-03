import React, { useEffect, useState } from "react";

import { cn } from "@/utils/classname";

const SHOW_PAGE_GROUP_COUNT: number = 10;

interface Props {
  pageNo: number;
  pageSize: number;
  totalCount: number;
  className?: string;
}

export default function Pagination(props: Props) {
  const { pageNo, pageSize, totalCount, className } = props;

  const [pageCount, setPageCount] = useState<number>(1);
  const [pageGroup, setPageGroup] = useState<number>(1);
  const [startGroup, setStartGroup] = useState<number>(1);
  const [endGroup, setEndGroup] = useState<number>(1);

  useEffect(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const currPageGroup = Math.ceil(pageNo / SHOW_PAGE_GROUP_COUNT);

    setPageCount(totalPageCount);
    setPageGroup(currPageGroup);
    setStartGroup((currPageGroup - 1) * SHOW_PAGE_GROUP_COUNT + 1);
    setEndGroup(pageGroup * SHOW_PAGE_GROUP_COUNT);
  }, [pageNo, totalCount]);

  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      <div
        className={cn(
          `flex h-30 w-30 items-center justify-center rounded-1/2 transition-all
          duration-200 ease-in-out`,
          "hover:cursor-pointer hover:border-1 hover:border-gainsboro",
        )}
      >
        1
      </div>
    </div>
  );
}
