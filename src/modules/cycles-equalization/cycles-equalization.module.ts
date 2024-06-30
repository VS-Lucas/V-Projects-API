import { Module } from '@nestjs/common';
import { CyclesEqualizationController } from './cycles-equalization.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CyclesEqualizationService } from './cycles-equalization.service';

@Module({
  controllers: [CyclesEqualizationController],
  providers: [CyclesEqualizationService, PrismaService],
  exports: [CyclesEqualizationService],
})
export class CyclesEqualizationModule {}
