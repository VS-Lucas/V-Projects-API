import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CyclesService } from './cycles.service';
import { CreateCycleDto } from './dto/create.cycle.dto';
import { CreatedCycleDto } from './dto/created.cycle.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/cycles')
@ApiTags('Cycle')
export class CyclesController {
  constructor(private readonly cyclesService: CyclesService) {}

  @Post()
  @ApiCreatedResponse({ type: CreatedCycleDto })
  async createCycle(@Body() createCycleDto: CreateCycleDto): Promise<CreatedCycleDto> {
    try {
        return await this.cyclesService.createCycle(createCycleDto);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }  
  }

  @Get(':id')
  async getCycle(@Param('id') id: number) {
    try {
        const cycle = await this.cyclesService.getCycle(id);
        if (!cycle) {
          throw new HttpException('Cycle not found', HttpStatus.NOT_FOUND);
        }
        return cycle;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }  
  }

  @Get()
  async getAllCycles() {
    try {
        return await this.cyclesService.getAllCycles();
      } catch (error) {
        throw new HttpException('Error retrieving cycles', HttpStatus.INTERNAL_SERVER_ERROR);
      }  
  }

  @Delete(':id')
  async deleteCycle(@Param('id') id: number) {
    try {
        await this.cyclesService.deleteCycleById(id);
        return { message: 'Cycle deleted successfully' };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
}
