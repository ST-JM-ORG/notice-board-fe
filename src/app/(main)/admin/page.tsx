"use client";

import React, {
  ChangeEvent,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { shallowEqual } from "react-redux";

import { useRouter } from "next/navigation";

import DataTable from "@/src/features/common/data-table";
import DataTableCell from "@/src/features/common/data-table-cell";
import DataTableRow from "@/src/features/common/data-table-row";
import Pagination from "@/src/features/common/pagination";
import ProfileImage from "@/src/features/common/profile-image";
import SearchInput from "@/src/features/common/search-input";
import SelectBox from "@/src/features/common/select-box";
import {
  useAppDispatch,
  useAppSelector,
  useThunkDispatch,
} from "@/src/redux/hook";
import { resetAdmin } from "@/src/redux/modules/admin-slice";
import { getAdminUserList } from "@/src/services/admin-api";
import { createRowNum } from "@/src/shared/utils/query";

interface Props {
  searchParams: Promise<{ p: string | undefined }>;
}

export default function Page({ searchParams }: Props) {
  const { p } = use(searchParams);

  const router = useRouter();
  const dispatch = useThunkDispatch();
  const appDispatch = useAppDispatch();

  const [pageNo, setPageNo] = useState<number>(1);
  const [searchType, setSearchType] = useState<{ type: string; name: string }>({
    type: "ALL",
    name: "전체",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { users, totalCount, totalPageCount } = useAppSelector(
    (state) => ({
      users: state.admin.userList.users,
      totalCount: state.admin.userList.totalCount,
      totalPageCount: state.admin.userList.totalPageCount,
    }),
    shallowEqual,
  );

  const handleChangeSearchWord = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setSearchTerm(e.target.value);
    },
    [setSearchTerm],
  );

  const handleAdminUserDetail = (id: number) => {
    router.push(`/admin/${id}`);
  };

  const handlePaging = (value: number) => {
    router.push(`/admin?p=${value}`);
  };

  const handleSearch = () => {
    dispatch(
      getAdminUserList({ pageNo, searchType: searchType.type, searchTerm }),
    );
  };

  useEffect(() => {
    setPageNo(p ? Number(p) : 1);
  }, [p]);

  useEffect(() => {
    dispatch(
      getAdminUserList({ pageNo, searchType: searchType.type, searchTerm }),
    );
  }, [dispatch, pageNo]);

  useEffect(() => {
    return () => {
      appDispatch(resetAdmin("getList"));
    };
  }, [appDispatch]);

  return (
    <>
      <div className="flex justify-end space-x-2">
        <SelectBox
          options={[
            { type: "ALL", name: "전체" },
            { type: "NAME", name: "이름" },
            { type: "EMAIL", name: "이메일" },
            { type: "CONTACT", name: "전화번호" },
          ]}
          value={searchType.name}
          onClick={(value) => setSearchType(value)}
        />
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={handleChangeSearchWord}
          handleClear={() => setSearchTerm("")}
          handleSearch={handleSearch}
        />
      </div>
      <DataTable
        columns={{
          cols: [
            { title: "번호", ratio: 10 },
            { title: "프로필", ratio: 10 },
            { title: "이메일", ratio: 30 },
            { title: "이름", ratio: 20 },
            { title: "연락처", ratio: 20 },
            { title: "관리자여부", ratio: 10 },
          ],
        }}
      >
        {users &&
          users.map(
            ({ id, email, name, contact, profileImg, adminYn }, index) => (
              <DataTableRow
                key={index}
                onClick={() => handleAdminUserDetail(id)}
              >
                <DataTableCell>
                  {createRowNum(10, pageNo, totalCount, index)}
                </DataTableCell>
                <DataTableCell className="flex items-center justify-center">
                  <ProfileImage src={profileImg} size={40} />
                </DataTableCell>
                <DataTableCell>{email}</DataTableCell>
                <DataTableCell>{name}</DataTableCell>
                <DataTableCell>{contact}</DataTableCell>
                <DataTableCell>{adminYn}</DataTableCell>
              </DataTableRow>
            ),
          )}
      </DataTable>
      <Pagination
        pageNo={pageNo}
        totalPage={totalPageCount}
        onClick={handlePaging}
        className="mt-10"
      />
    </>
  );
}
