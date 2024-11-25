import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString, MinLength, isDate, isNotEmpty } from "class-validator";
import { Address } from "./address.dto";
import { Type } from "class-transformer";

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

    @IsString()
    @IsNotEmpty()
    profilePhoto: string

    @IsString()
    @IsNotEmpty()
    phoneNumber:string
    
    @IsDate()
    @IsNotEmpty()
    birthDate:Date

    @IsString()
    @IsNotEmpty()
    sector:string

    // @ApiProperty({ type: Address })
    // @IsNotEmpty()
    // @Type(() => Address)
    // address: Address
}
