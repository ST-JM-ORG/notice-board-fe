export type Status = "idle" | "pending" | "fulfilled" | "rejected";

export type ModulePermissionType = {
  id: number;
  roleName: string;
  role: string;
  permissions: {
    name: string;
    url: string;
    allowed: boolean;
  }[];
};
