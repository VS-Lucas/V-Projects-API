import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString, IsNotEmpty } from "class-validator";

export class SelfAssesmentScores {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    selfAssessmentId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    criterionId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    grade: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    justification: string;
}
