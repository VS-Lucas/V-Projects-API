import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UpdateSelfAssesmentDto } from 'src/modules/self-assesment/dto/update-self-assesment.dto';

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

  @ApiProperty()
  status?: boolean;

  @IsOptional()
  @ApiProperty()
  scores?: UpdateSelfAssesmentDto[];
}
