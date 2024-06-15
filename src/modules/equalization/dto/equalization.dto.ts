import { ApiProperty } from '@nestjs/swagger';

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
  finalGrade: number;
}
