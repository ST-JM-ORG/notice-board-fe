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

import DataTable from "@/components/data-table";
import DataTableCell from "@/components/data-table-cell";
import DataTableRow from "@/components/data-table-row";
import Pagination from "@/components/pagination";
import ProfileImage from "@/components/profile-image";
import SearchInput from "@/components/search-input";

import { getAdminUserList } from "@/redux/apis/admin-api";
import { useAppDispatch, useAppSelector, useThunkDispatch } from "@/redux/hook";
import { resetAdmin } from "@/redux/modules/admin-slice";

import { createRowNum } from "@/utils/query";

interface Props {
  searchParams: Promise<{ p: string | undefined }>;
}

export default function Page(props: Props) {
  const { searchParams } = props;

  const { p } = use(searchParams);

  const router = useRouter();
  const dispatch = useThunkDispatch();
  const appDispatch = useAppDispatch();

  const { users, totalCount, totalPageCount } = useAppSelector(
    (state) => ({
      users: state.admin.userList.users,
      totalCount: state.admin.userList.totalCount,
      totalPageCount: state.admin.userList.totalPageCount,
    }),
    shallowEqual,
  );

  const [pageNo, setPageNo] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChangeSearchTerm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setSearchTerm(e.target.value);
    },
    [searchTerm],
  );

  const handleAdminUserDetail = (id: number) => {
    router.push(`/admin/${id}`);
  };

  const handlePaging = (value: number) => {
    router.push(`/admin?p=${value}`);
  };

  useEffect(() => {
    setPageNo(p ? Number(p) : 1);
  }, [p]);

  useEffect(() => {
    dispatch(getAdminUserList({ pageNo }));
  }, [dispatch, pageNo]);

  useEffect(() => {
    return () => {
      appDispatch(resetAdmin("getList"));
    };
  }, [appDispatch]);

  return (
    <>
      <div className="flex justify-end space-x-2">
        <select>
          <option>전체</option>
          <option>이메일</option>
          <option>이름</option>
          <option>전화번호</option>
        </select>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
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
