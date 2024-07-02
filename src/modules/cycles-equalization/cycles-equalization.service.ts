import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCycleEqualizationDto } from './dto/create.cycleEqualization.dto';

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
                },
            });

            return {
                id: cycleEqualization.id,
                name: cycleEqualization.name,
                startDate: cycleEqualization.startDate.toISOString(),
                endDate: cycleEqualization.endDate.toISOString(),
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

            return {
                id: cycleEqualization.id,
                name: cycleEqualization.name,
                startDate: cycleEqualization.startDate.toISOString(),
                endDate: cycleEqualization.endDate.toISOString(),
            };
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong while fetching the cycle equalization');
        }
    }

    async getAllCycleEqualizations() {
        try {
            return await this.prisma.cycleEqualization.findMany({
                include: {
                  Equalizations: true
                },
              });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong while fetching the cycle equalizations');
        }
    }
}
