export type Status = {
  status: "pending" | "fulfilled" | "rejected";
  message: string;
  error: string;
  code: string;
};
