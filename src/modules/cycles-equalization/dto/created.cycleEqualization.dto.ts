import { ApiProperty } from '@nestjs/swagger';

export class CreatedCycleEqualizationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;
}
