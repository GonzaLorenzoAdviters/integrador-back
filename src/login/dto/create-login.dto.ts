import { IsEmail, IsString } from "@nestjs/class-validator";

export class CreateLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
