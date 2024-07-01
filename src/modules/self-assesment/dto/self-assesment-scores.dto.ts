import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString, IsNotEmpty } from "class-validator";

export class SelfAssesmentScores {
    @ApiProperty()
    selfAssessmentId?: number;

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
    justification: string;
}
