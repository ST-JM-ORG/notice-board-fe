import { ModulePermissionType } from "@/src/shared/constants/type";

export const ACCESS_TOKEN = "token";

export const REFRESH_TOKEN = "refresh";

export const ERROR_RESPONSE = {
  data: null,
  result: {
    status: 500,
    code: "E500",
    message: "서버에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
    target: null,
  },
};

export const MODULE_PERMISSION: ModulePermissionType[] = [
  {
    id: 1,
    roleName: "최고관리자",
    role: "SUPER_ADMIN",
    permissions: [
      { name: "관리자", url: "/admin", allowed: true },
      { name: "프로필", url: "/profile", allowed: true },
      { name: "홈", url: "/", allowed: true },
    ],
  },
  {
    id: 2,
    roleName: "관리자",
    role: "ADMIN",
    permissions: [
      { name: "관리자", url: "/admin", allowed: true },
      { name: "프로필", url: "/profile", allowed: true },
      { name: "홈", url: "/", allowed: true },
    ],
  },
  {
    id: 3,
    roleName: "사용자",
    role: "USER",
    permissions: [
      { name: "관리자", url: "/admin", allowed: false },
      { name: "프로필", url: "/profile", allowed: true },
      { name: "홈", url: "/", allowed: true },
    ],
  },
];
