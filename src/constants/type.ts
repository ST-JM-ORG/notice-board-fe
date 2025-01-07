export type Status = "idle" | "pending" | "fulfilled" | "rejected";

export type ModulePermissionType = {
  id: number;
  roleName: string;
  role: string;
  permissions: {
    pageName: string;
    url: string;
    canAccess: {
      create: { allowed: boolean; url: string };
      read: { allowed: boolean; url: string };
      update: { allowed: boolean; url: string };
      detail: { allowed: boolean; url: string };
    };
  }[];
};
