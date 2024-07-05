import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { SelfAssesmentService } from './self-assesment.service';
import { CreateSelfAssesmentDto } from './dto/create-self-assesment.dto';
import { UpdateSelfAssesmentDto } from './dto/update-self-assesment.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('api/self-assesment')
@ApiTags('Self Assesment')
export class SelfAssesmentController {
  constructor(private readonly selfAssesmentService: SelfAssesmentService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateSelfAssesmentDto })
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

  @Get('/user/all/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.selfAssesmentService.findAllSelfAssessmentsByUserId(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSelfAssesmentDto: UpdateSelfAssesmentDto) {
    return this.selfAssesmentService.update(+id, updateSelfAssesmentDto);
  }

  @Get('/user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.selfAssesmentService.findSelfAsessmentIdByUserId(+userId);
  }
}
