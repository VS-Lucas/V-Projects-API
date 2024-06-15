import { Module } from '@nestjs/common';
import { EqualizationController } from './equalization.controller';
import { EqualizationService } from './equalization.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [EqualizationController],
  providers: [EqualizationService, PrismaService],
})
export class EqualizationModule {}
