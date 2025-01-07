import { ModulePermissionType } from "@/constants/type";

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
      {
        pageName: "관리자",
        url: "/admin",
        canAccess: {
          create: { allowed: false, url: "" },
          read: { allowed: true, url: "/admin" },
          update: { allowed: true, url: "/admin" },
          detail: { allowed: true, url: "/admin" },
        },
      },
      {
        pageName: "프로필",
        url: "/profile",
        canAccess: {
          create: { allowed: false, url: "" },
          read: { allowed: true, url: "/profile" },
          update: { allowed: true, url: "/profile" },
          detail: { allowed: true, url: "/profile" },
        },
      },
      {
        pageName: "홈",
        url: "/",
        canAccess: {
          create: { allowed: false, url: "" },
          read: { allowed: true, url: "/" },
          update: { allowed: false, url: "" },
          detail: { allowed: false, url: "" },
        },
      },
    ],
  },
  {
    id: 2,
    roleName: "관리자",
    role: "ADMIN",
    permissions: [
      {
        pageName: "관리자",
        url: "/admin",
        canAccess: {
          create: { allowed: false, url: "" },
          read: { allowed: true, url: "/admin" },
          update: { allowed: true, url: "/admin" },
          detail: { allowed: true, url: "/admin" },
        },
      },
      {
        pageName: "프로필",
        url: "/profile",
        canAccess: {
          create: { allowed: false, url: "" },
          read: { allowed: true, url: "/profile" },
          update: { allowed: true, url: "/profile" },
          detail: { allowed: true, url: "/profile" },
        },
      },
      {
        pageName: "홈",
        url: "/",
        canAccess: {
          create: { allowed: false, url: "" },
          read: { allowed: true, url: "/" },
          update: { allowed: false, url: "" },
          detail: { allowed: false, url: "" },
        },
      },
    ],
  },
  {
    id: 3,
    roleName: "사용자",
    role: "USER",
    permissions: [
      {
        pageName: "관리자",
        url: "/admin",
        canAccess: {
          create: { allowed: false, url: "" },
          read: { allowed: false, url: "" },
          update: { allowed: false, url: "" },
          detail: { allowed: false, url: "" },
        },
      },
      {
        pageName: "프로필",
        url: "/profile",
        canAccess: {
          create: { allowed: false, url: "" },
          read: { allowed: true, url: "/profile" },
          update: { allowed: true, url: "/profile" },
          detail: { allowed: true, url: "/profile" },
        },
      },
      {
        pageName: "홈",
        url: "/",
        canAccess: {
          create: { allowed: false, url: "" },
          read: { allowed: true, url: "/" },
          update: { allowed: false, url: "" },
          detail: { allowed: false, url: "" },
        },
      },
    ],
  },
];
