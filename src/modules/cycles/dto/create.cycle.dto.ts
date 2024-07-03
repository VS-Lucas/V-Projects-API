import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsISO8601, IsOptional } from "class-validator";

export class CreateCycleDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsISO8601()
    @IsNotEmpty()
    @ApiProperty()
    startDate: string;

    @IsISO8601()
    @IsNotEmpty()
    @ApiProperty()
    endDate: string;

    @IsOptional()
    @ApiProperty()
    finalGrade?: number;
}