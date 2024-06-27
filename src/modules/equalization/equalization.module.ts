import { Module } from '@nestjs/common';
import { EqualizationController } from './equalization.controller';
import { EqualizationService } from './equalization.service';
import { PrismaService } from 'src/database/prisma.service';
import { SelfAssesmentModule } from '../self-assesment/self-assesment.module';
import { SelfAssesmentService } from '../self-assesment/self-assesment.service';

@Module({
  imports: [SelfAssesmentModule],
  controllers: [EqualizationController],
  providers: [EqualizationService, PrismaService, SelfAssesmentService,],

})
export class EqualizationModule {}
