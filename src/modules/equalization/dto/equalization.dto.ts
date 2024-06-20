import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { EqualizationScore } from './equalization-scores.dto';

export class EqualizationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  evaluatorId: number;

  @ApiProperty()
  evaluatedId: number;

  @ApiProperty()
  cycleId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  status?: string;

  @ApiProperty({ type: [EqualizationScore] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EqualizationScore)
  scores: EqualizationScore[];
}
