import { IsEmail, IsOptional, IsString } from "class-validator";

export class UserDetailForm {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  originFile: File | undefined | null;

  @IsString()
  @IsOptional()
  file: string | undefined | null;

  @IsString()
  @IsOptional()
  fileName: string | undefined | null;

  @IsString()
  @IsOptional()
  mime: string | undefined | null;
}
