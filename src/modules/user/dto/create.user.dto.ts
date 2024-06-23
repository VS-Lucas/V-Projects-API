import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export enum UserRole {
    COLABORADOR = 'COLABORADOR',
    SOCIO = 'SOCIO',
}

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Role of the user',
        enum: UserRole,
        example: UserRole.COLABORADOR,
    })
    role: UserRole;

    @IsString()
    @IsNotEmpty()
    position: string
}
