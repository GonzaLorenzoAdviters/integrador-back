import { IsString, IsUUID } from "@nestjs/class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsUUID()
    role: Role;
}
