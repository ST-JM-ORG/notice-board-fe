import React, { PropsWithChildren, useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { cn } from "@/utils/classname";

type PaginationProps = {
  totalPageGroupCount: number; // 전체 페이지네이션 그룹의 수
  currPageGroupNo: number; // 현재 페이지네이션 그룹의 번호
  groupStartNo: number; // 현재 페이지네이션 그룹의 시작 번호
  groupEndNo: number; // 현재 페이지네이션 그룹의 마지막 번호
};

interface Props {
  pageNo: number; // 페이지 번호
  totalPage: number; // 전체 페이지 수
  showPageCount?: number; // 한 페이지에 보여줄 번호의 개수
  onClick: (pageNo: number) => void;
  className?: string;
}

export default function Pagination(props: Props) {
  const { pageNo, totalPage, showPageCount = 10, onClick, className } = props;

  const [pagingInfo, setPagingInfo] = useState<PaginationProps>({
    totalPageGroupCount: 1,
    currPageGroupNo: 1,
    groupStartNo: 1,
    groupEndNo: 1,
  });

  const handlePrevPage = () => {
    if (pageNo > 1) {
      onClick(pageNo - 1);
    }
  };

  const handleNextPage = () => {
    if (totalPage > pageNo) {
      onClick(pageNo + 1);
    }
  };

  const handlePrevGroup = () => {
    const { currPageGroupNo } = pagingInfo;

    if (currPageGroupNo > 1) {
      const prevGroupLastNum = (currPageGroupNo - 1) * showPageCount;
      onClick(prevGroupLastNum);
    } else {
      onClick(1);
    }
  };

  const handleNextGroup = () => {
    const { totalPageGroupCount, currPageGroupNo, groupEndNo } = pagingInfo;

    if (currPageGroupNo < totalPageGroupCount) {
      const nextGroupFirstNum = currPageGroupNo * showPageCount + 1;
      onClick(nextGroupFirstNum);
    } else {
      onClick(groupEndNo);
    }
  };

  useEffect(() => {
    const currPageGroupNo = Math.ceil(pageNo / showPageCount); // 현재 페이지 그룹 번호
    const totalPageGroupCount = Math.ceil(totalPage / showPageCount); // 전체 페이지 그룹의 수

    const startNum = (currPageGroupNo - 1) * showPageCount + 1;
    const lastNum = currPageGroupNo * showPageCount;

    setPagingInfo({
      totalPageGroupCount,
      currPageGroupNo: currPageGroupNo,
      groupStartNo: startNum,
      groupEndNo: lastNum > totalPage ? totalPage : lastNum,
    });
  }, [pageNo, totalPage]);

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center space-x-1",
        className,
      )}
    >
      <PagingButton onClick={handlePrevGroup}>
        <FaAngleDoubleLeft />
      </PagingButton>
      <PagingButton onClick={handlePrevPage}>
        <FaAngleLeft />
      </PagingButton>

      {Array.from(
        { length: pagingInfo.groupEndNo - pagingInfo.groupStartNo + 1 },
        (_, index) => (
          <button
            key={index}
            className={cn(
              `border-1- flex h-40 w-40 items-center justify-center rounded-10 border-1 p-10
              transition-all duration-200 ease-in-out`,
              pagingInfo.groupStartNo + index === pageNo
                ? "border-sky-blue bg-vivid-cerulean text-white"
                : "border-gainsboro",
              "hover:cursor-pointer hover:bg-sky-blue hover:text-white",
            )}
            onClick={() => onClick(pagingInfo.groupStartNo + index)}
          >
            {pagingInfo.groupStartNo + index}
          </button>
        ),
      )}

      <PagingButton onClick={handleNextPage}>
        <FaAngleRight />
      </PagingButton>
      <PagingButton onClick={handleNextGroup}>
        <FaAngleDoubleRight />
      </PagingButton>
    </div>
  );
}

function PagingButton(props: PropsWithChildren<{ onClick?: () => void }>) {
  const { onClick, children } = props;

  return (
    <button
      className={cn(
        `flex h-40 w-40 items-center justify-center rounded-10 border-1 border-gainsboro
        p-10`,
        "hover:bg-sky-blue hover:text-white",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
