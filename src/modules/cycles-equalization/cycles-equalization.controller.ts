import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CyclesEqualizationService } from './cycles-equalization.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateCycleEqualizationDto } from './dto/create.cycleEqualization.dto';
import { CreatedCycleEqualizationDto } from './dto/created.cycleEqualization.dto';
import { Role } from 'src/decorators/role.decorator';

@Role('SOCIO')
@Controller('api/cycles-equalization')
@ApiTags('CycleEqualization')
export class CyclesEqualizationController {
    constructor(private readonly cyclesEqualizationService: CyclesEqualizationService) {}

    @Post()
    @ApiCreatedResponse({ type: CreatedCycleEqualizationDto })
    async create(@Body() createCycleEqualizationDto: CreateCycleEqualizationDto) {
      try {
          return await this.cyclesEqualizationService.createCycleEqualization(createCycleEqualizationDto);
        } catch (error) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        }  
    }
  
    @Get()
    async getAll() {
      try {
          return await this.cyclesEqualizationService.getAllCycleEqualizations();
        } catch (error) {
          throw new HttpException('Error retrieving cycles', HttpStatus.INTERNAL_SERVER_ERROR);
        }  
    }
}
