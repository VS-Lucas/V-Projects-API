import { PartialType } from '@nestjs/mapped-types';
import { CreateEqualizationDto } from './create-equalization.dto';

export class UpdateEqualizationDto extends PartialType(CreateEqualizationDto) {}
