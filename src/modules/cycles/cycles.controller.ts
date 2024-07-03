import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { CyclesService } from './cycles.service';
import { CreateCycleDto } from './dto/create.cycle.dto';
import { CreatedCycleDto } from './dto/created.cycle.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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

  @Get()
  async getAllCycles() {
    try {
        return await this.cyclesService.getAllCycles();
      } catch (error) {
        throw new HttpException('Error retrieving cycles', HttpStatus.INTERNAL_SERVER_ERROR);
      }  
  }

  @Get('/current')
  @ApiOkResponse({ type: CreatedCycleDto })
  async getCurrentCycle(): Promise<CreateCycleDto> {
    return this.cyclesService.getCurrentCycle();
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

  @Delete(':id')
  async deleteCycle(@Param('id') id: number) {
    try {
        await this.cyclesService.deleteCycleById(id);
        return { message: 'Cycle deleted successfully' };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  @Patch(':id')
  async updateCycle(@Param('id') id: number, @Body() createdCycleDto: CreatedCycleDto) {
    try {
        return await this.cyclesService.updateCycle(id, createdCycleDto);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }  
  }
}
