import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PeerReviewScoreDto } from "./peer-review-score.dto";

export class RegisterPeerReviewDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    evaluatorId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    evaluatedId: number; 

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    cycleId: number; 

    @ApiProperty()
    @IsBoolean()
    isFinished: boolean;

    @ApiProperty({ type: PeerReviewScoreDto })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PeerReviewScoreDto)
    assessment: PeerReviewScoreDto; 

}
