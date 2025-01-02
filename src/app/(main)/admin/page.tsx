"use client";

import React, { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";

import DataTable from "@components/data-table";
import DataTableCell from "@components/data-table-cell";
import DataTableRow from "@components/data-table-row";

import { getAdminUserList } from "@redux/apis/admin-api";
import { useAppDispatch, useAppSelector, useThunkDispatch } from "@redux/hook";
import { resetAdmin } from "@redux/modules/admin-slice";

export default function Page() {
  const appDispatch = useAppDispatch();
  const dispatch = useThunkDispatch();

  const { adminUser } = useAppSelector((state) => ({
    adminUser: state.admin.getAdminUser.adminUser,
  }));

  const [pageNo, setPageNo] = useState<number>(1);

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
        {adminUser &&
          adminUser.map(
            ({ id, email, name, contact, profileImg, adminYn }, index) => (
              <DataTableRow key={index}>
                <DataTableCell>{id}</DataTableCell>
                <DataTableCell className="flex items-center justify-center">
                  {profileImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt="Profile Image"
                      src={process.env.NEXT_PUBLIC_BASE_URL + profileImg}
                      className="h-50 w-50 rounded-1/2"
                    />
                  ) : (
                    <div className="flex h-50 w-50 items-center justify-center rounded-1/2 bg-gainsboro">
                      <IoPerson className="h-20 w-20" />
                    </div>
                  )}
                </DataTableCell>
                <DataTableCell>{email}</DataTableCell>
                <DataTableCell>{name}</DataTableCell>
                <DataTableCell>{contact}</DataTableCell>
                <DataTableCell>{adminYn}</DataTableCell>
              </DataTableRow>
            ),
          )}
      </DataTable>
    </>
  );
}
