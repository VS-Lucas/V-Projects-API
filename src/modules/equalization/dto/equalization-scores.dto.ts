import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsNotEmpty } from "class-validator";

export class EqualizationScore {
    @ApiProperty()
    equalizationId?: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    criterionId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    grade: number;
}
