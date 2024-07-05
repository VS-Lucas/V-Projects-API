import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCycleEqualizationDto } from './dto/create.cycleEqualization.dto';
import { CreatedCycleEqualizationDto } from './dto/created.cycleEqualization.dto';

@Injectable()
export class CyclesEqualizationService {
    constructor(private prisma: PrismaService) {}

    async createCycleEqualization (data: CreateCycleEqualizationDto) {
        try {
            const existingCycleEqualization = await this.prisma.cycleEqualization.findFirst({
                where: {
                    name: data.name
                }
            });

            if (existingCycleEqualization) {
                throw new ConflictException('A cycle equalization already exists for this name');
            }

            const existingDateCycleEqualization = await this.prisma.cycleEqualization.findFirst({
                where: {
                    OR: [
                        {
                            startDate: {
                                lte: new Date(data.endDate),
                            },
                            endDate: {
                                gte: new Date(data.startDate),
                            },
                        },
                        {
                            startDate: {
                                gte: new Date(data.startDate),
                            },
                            endDate: {
                                lte: new Date(data.endDate),
                            },
                        },
                    ],
                }
            });

            if (existingDateCycleEqualization) {
                throw new ConflictException('A cycle equalization already exists with the same date range');
            }

            const cycleEqualization = await this.prisma.cycleEqualization.create({
                data: {
                    name: data.name,
                    startDate: new Date(data.startDate),
                    endDate: new Date(data.endDate),
                    finalGrade: data.finalGrade ?? 0.0,
                },
            });

            return {
                id: cycleEqualization.id,
                name: cycleEqualization.name,
                startDate: cycleEqualization.startDate.toISOString(),
                endDate: cycleEqualization.endDate.toISOString(),
                finalGrade: cycleEqualization.finalGrade,
            };
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Something went wrong while creating the cycle equalization');
            }        
        }
    }

    async getCycleEqualization(id: number) {
        try {
            const cycleEqualization = await this.prisma.cycleEqualization.findUnique({
                where: {
                    id: Number(id)
                }
            });

            if (!cycleEqualization) {
                throw new NotFoundException('Cycle equalization not found');
            }

            return cycleEqualization;
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong while fetching the cycle equalization');
        }
    }

    async getAllCycleEqualizations() {
        try {
            return await this.prisma.cycleEqualization.findMany({
                include: {
                  Equalizations: {
                    include: {
                      evaluated: true,
                    },
                  }
                },
              });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong while fetching the cycle equalizations');
        }
    }

    async updateCycleEqualization(id: number, data: CreatedCycleEqualizationDto) {
        try {
          const existingCycle = await this.prisma.cycleEqualization.findFirst({
            where: { id: Number(id) }
          });
      
          if (!existingCycle) {
            throw new ConflictException("A cycle does not exist for this id");
          }
      
          if (data.name && existingCycle.name !== data.name) {
            const existingNameCycle = await this.prisma.cycleEqualization.findFirst({
              where: { name: data.name }
            });
            if (existingNameCycle) {
              throw new ConflictException("A cycle already exists for this name");
            }
          }
      
          if (data.startDate && data.endDate) {
            const existingDateCycle = await this.prisma.cycleEqualization.findFirst({
              where: {
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate)
              }
            });
            if (existingDateCycle) {
              throw new ConflictException("A cycle already exists with the same date range");
            }
          }
      
          const cycleEqualization = await this.prisma.cycleEqualization.update({
            where: { id: Number(id) },
            data: {
              ...data,
              startDate: data.startDate ? new Date(data.startDate) : existingCycle.startDate,
              endDate: data.endDate ? new Date(data.endDate) : existingCycle.endDate
            }
          });
    
          return {
            id: cycleEqualization.id,
            name: cycleEqualization.name,
            startDate: cycleEqualization.startDate.toISOString(),
            endDate: cycleEqualization.endDate.toISOString(),
            finalGrade: cycleEqualization.finalGrade,
            status: cycleEqualization.status,
          };
        } catch (error) {
    
          if (error instanceof ConflictException) {
            throw error;
          }
          throw new InternalServerErrorException('Something went wrong while updating the cycle');
        }
      }

      async getCurrentCycleId() {
        const currentDate = new Date();
    
        const currentCycle = await this.prisma.cycleEqualization.findFirst({
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
    
        return currentCycle.id;
      }
}
