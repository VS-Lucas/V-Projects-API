import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatedCycleEqualizationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @IsOptional()
  @ApiProperty()
  finalGrade?: number;
}
