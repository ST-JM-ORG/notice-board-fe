export type AdminUserProps = {
  id: number;
  email: string;
  name: string;
  contact: string;
  profileImg: string;
  adminYn: string;
};

export type AdminUserResponse = {
  data: {
    id: number;
    email: string;
    name: string;
    contact: string;
    profileImg: string;
    adminYn: string;
  }[];
  total: number;
  size: number;
  page: number;
};
