import { Module } from '@nestjs/common';
import { SelfAssesmentService } from './self-assesment.service';
import { SelfAssesmentController } from './self-assesment.controller';

@Module({
  controllers: [SelfAssesmentController],
  providers: [SelfAssesmentService],
})
export class SelfAssesmentModule {}
