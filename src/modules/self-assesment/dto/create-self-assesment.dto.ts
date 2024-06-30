import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { SelfAssesmentScores } from "./self-assesment-scores.dto";

export class CreateSelfAssesmentDto {
    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    cycleId: number;

    @ApiProperty()
    status?: boolean;

    @ApiProperty({ type: [SelfAssesmentScores] })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => SelfAssesmentScores)
    scores: SelfAssesmentScores[];
}
