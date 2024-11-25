import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { EqualizationScore } from './equalization-scores.dto';

export class CreateEqualizationDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  evaluatorId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  evaluatedId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  cycleId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  cycleEqualizationId: number;

  @ApiProperty()
  status?: boolean;

  @ApiProperty({ type: [EqualizationScore] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EqualizationScore)
  scores: EqualizationScore[];
}
