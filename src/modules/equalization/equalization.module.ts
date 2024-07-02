import { Module } from '@nestjs/common';
import { EqualizationController } from './equalization.controller';
import { EqualizationService } from './equalization.service';
import { PrismaService } from 'src/database/prisma.service';
import { SelfAssesmentService } from '../self-assesment/self-assesment.service';
import { CyclesModule } from '../cycles/cycles.module';

@Module({
  imports: [CyclesModule],
  controllers: [EqualizationController],
  providers: [EqualizationService, PrismaService, SelfAssesmentService,],

})
export class EqualizationModule {}
