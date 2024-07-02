import { Module } from '@nestjs/common';
import { SelfAssesmentService } from './self-assesment.service';
import { SelfAssesmentController } from './self-assesment.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CyclesService } from '../cycles/cycles.service';

@Module({
  controllers: [SelfAssesmentController],
  providers: [SelfAssesmentService, PrismaService, CyclesService],
})
export class SelfAssesmentModule {}
