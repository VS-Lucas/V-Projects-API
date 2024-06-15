import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsISO8601 } from 'class-validator';

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

  @IsISO8601()
  @IsNotEmpty()
  @ApiProperty()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  finalGrade: number;
}
