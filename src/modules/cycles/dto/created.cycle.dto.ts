import { ApiProperty } from '@nestjs/swagger';

export class CreatedCycleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;
}
