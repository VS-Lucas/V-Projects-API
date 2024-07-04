import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatedCycleDto {
  @ApiProperty()
  id: number;

  @IsOptional()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  startDate: string;

  @IsOptional()
  @ApiProperty()
  endDate: string;

  @IsOptional()
  @ApiProperty()
  finalGrade?: number;
}
