import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SelfAssesmentService } from './self-assesment.service';
import { CreateSelfAssesmentDto } from './dto/create-self-assesment.dto';
import { UpdateSelfAssesmentDto } from './dto/update-self-assesment.dto';

@Controller('self-assesment')
export class SelfAssesmentController {
  constructor(private readonly selfAssesmentService: SelfAssesmentService) {}

  @Post()
  create(@Body() createSelfAssesmentDto: CreateSelfAssesmentDto) {
    return this.selfAssesmentService.create(createSelfAssesmentDto);
  }

  @Get()
  findAll() {
    return this.selfAssesmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selfAssesmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSelfAssesmentDto: UpdateSelfAssesmentDto) {
    return this.selfAssesmentService.update(+id, updateSelfAssesmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selfAssesmentService.remove(+id);
  }
}
