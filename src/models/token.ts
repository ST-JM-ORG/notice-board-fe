import { JwtPayload } from "jwt-decode";

export type TokenPayload = JwtPayload & {
  memberId: number;
  name: string;
  profileImg: string;
  role: string;
};
