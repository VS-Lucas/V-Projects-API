import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateEqualizationDto } from './dto/create-equalization.dto';
import { EqualizationDto } from './dto/equalization.dto';
import { UpdateEqualizationDto } from './dto/update-equalization.dto';

@Injectable()
export class EqualizationService {
  constructor(private prisma: PrismaService) {}

  async create(createEqualizationDto: CreateEqualizationDto): Promise<EqualizationDto> {
    const existingEqualization = await this.prisma.equalization.findFirst({
      where: {
        evaluatorId: createEqualizationDto.evaluatorId,
        evaluatedId: createEqualizationDto.evaluatedId,
        cycleId: createEqualizationDto.cycleId,
      },
    });

    if (existingEqualization) {
      throw new ConflictException('Equalization already exists for this evaluator, evaluated, and cycle combination');
    }

    const equalization = await this.prisma.equalization.create({
      data: {
        ...createEqualizationDto,
        date: new Date(createEqualizationDto.date),
      },
    });

    return {
      id: equalization.id,
      evaluatorId: equalization.evaluatorId,
      evaluatedId: equalization.evaluatedId,
      cycleId: equalization.cycleId,
      date: equalization.date,
      finalGrade: equalization.finalGrade,
    };
  }

  async findAll(): Promise<EqualizationDto[]> {
    const equalizations = await this.prisma.equalization.findMany();
    return equalizations.map(equalization => ({
      id: equalization.id,
      evaluatorId: equalization.evaluatorId,
      evaluatedId: equalization.evaluatedId,
      cycleId: equalization.cycleId,
      date: equalization.date,
      finalGrade: equalization.finalGrade,
    }));
  }

  async findOne(id: number): Promise<EqualizationDto> {
    const equalization = await this.prisma.equalization.findUnique({
      where: { id },
    });

    if (!equalization) {
      throw new ConflictException('Equalization not found');
    }

    return {
      id: equalization.id,
      evaluatorId: equalization.evaluatorId,
      evaluatedId: equalization.evaluatedId,
      cycleId: equalization.cycleId,
      date: equalization.date,
      finalGrade: equalization.finalGrade,
    };
  }

    async findByEvaluator(evaluatorId: number): Promise<EqualizationDto[]> {
        const equalizations = await this.prisma.equalization.findMany({
        where: { evaluatorId },
        });
    
        return equalizations.map(equalization => ({
        id: equalization.id,
        evaluatorId: equalization.evaluatorId,
        evaluatedId: equalization.evaluatedId,
        cycleId: equalization.cycleId,
        date: equalization.date,
        finalGrade: equalization.finalGrade,
        }));
    }

    async findByEvaluated(evaluatedId: number): Promise<EqualizationDto[]> {
        const equalizations = await this.prisma.equalization.findMany({
        where: { evaluatedId },
        });
    
        return equalizations.map(equalization => ({
        id: equalization.id,
        evaluatorId: equalization.evaluatorId,
        evaluatedId: equalization.evaluatedId,
        cycleId: equalization.cycleId,
        date: equalization.date,
        finalGrade: equalization.finalGrade,
        }));
    }

    async findByCycle(cycleId: number): Promise<EqualizationDto[]> {
        const equalizations = await this.prisma.equalization.findMany({
        where: { cycleId },
        });
    
        return equalizations.map(equalization => ({
        id: equalization.id,
        evaluatorId: equalization.evaluatorId,
        evaluatedId: equalization.evaluatedId,
        cycleId: equalization.cycleId,
        date: equalization.date,
        finalGrade: equalization.finalGrade,
        }));
    }

    async editEqualation(id: number, updateEqualizationDto: UpdateEqualizationDto): Promise<EqualizationDto> {
        const equalization = await this.prisma.equalization.update({
            where: { id },
            data: {
                ...updateEqualizationDto,
                date: new Date(updateEqualizationDto.date),
            },
        });

        return {
            id: equalization.id,
            evaluatorId: equalization.evaluatorId,
            evaluatedId: equalization.evaluatedId,
            cycleId: equalization.cycleId,
            date: equalization.date,
            finalGrade: equalization.finalGrade,
        };
    }
}
