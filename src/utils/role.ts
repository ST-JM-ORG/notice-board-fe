export const adminRole = (role: string) =>
  role === "ADMIN" || role === "SUPER_ADMIN";

export const superAdminRole = (role: string) => role === "SUPER_ADMIN";
