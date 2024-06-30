import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCycleDto } from './dto/create.cycle.dto';
import { CreatedCycleDto } from './dto/created.cycle.dto';

@Injectable()
export class CyclesService {
  constructor(private prisma: PrismaService) {}

  async createCycle(data: CreateCycleDto): Promise<CreatedCycleDto> {
    try {
    const existingCycle = await this.prisma.cycle.findFirst({
      where: {
        name: data.name
      }
    });

    if (existingCycle) {
      throw new ConflictException('A cycle already exists for this name');   
    }

    const existingDateCycle = await this.prisma.cycle.findFirst({
      where: {
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      }
    });

    if (existingDateCycle) {
      throw new ConflictException('A cycle already exists with the same date range');
    }

    const cycle = await this.prisma.cycle.create({
      data: {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
      });
  
      return {
        id: cycle.id,
        name: cycle.name,
        startDate: cycle.startDate.toISOString(),
        endDate: cycle.endDate.toISOString(),
      };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong while creating the cycle');
    }
  }

  async getCycle(id: number) {
    try {
      const cycle = await this.prisma.cycle.findUnique({      
        where: {
        id : Number(id)
        }
      })
      
      if (!cycle) {
        throw new NotFoundException(`Cycle with ID ${id} not found`);
      }
      return cycle;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong while fetching the cycle');
    }
  }

  async getAllCycles() {
    try {
      return await this.prisma.cycle.findMany({
        include: {
          SelfAssessments: true,
          PeerReviews: true,
          Equalizations: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Cycle not found`);
    }
  }

  async getCurrentCycle(): Promise<CreatedCycleDto> {
    const currentDate = new Date();

    const currentCycle = await this.prisma.cycle.findFirst({
      where: {
        startDate: {
          lte: currentDate,
        },
        endDate: {
          gte: currentDate,
        },
      },
    });

    if (!currentCycle) {
      throw new NotFoundException('No active cycle found');
    }

    return {
      id: currentCycle.id,
      name: currentCycle.name,
      startDate: String(currentCycle.startDate),
      endDate: String(currentCycle.endDate)
    };
  }

  async deleteCycleById(id: number) {
     try {
      const cycle = await this.prisma.cycle.findUnique({
        where: {
          id : Number(id)
          }
      });

      if (!cycle) {
        throw new NotFoundException(`Cycle with ID ${id} not found`);
      }

      return this.prisma.cycle.delete({
        where: {
          id : Number(id),
        },
      });
    }
    catch (error) {
      
      throw new InternalServerErrorException('Something went wrong while deleting the cycle');
    }  
  }
  
}
