import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PeerReviewScoreDto {



    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    behavior: number; 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tecniques: number; 

    @ApiProperty()
    @IsNotEmpty()
    toImprove: string; 

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    toPraise: string;

}