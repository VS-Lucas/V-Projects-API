import { PartialType } from '@nestjs/mapped-types';
import { CreateSelfAssesmentDto } from './create-self-assesment.dto';

export class UpdateSelfAssesmentDto extends PartialType(CreateSelfAssesmentDto) {}
