import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CyclesModule } from './modules/cycles/cycles.module';
import { PrismaService } from './database/prisma.service';
import { SelfAssesmentModule } from './modules/self-assesment/self-assesment.module';
import {HistoryModule} from './modules/history/history.module';
import { PeerReviewModule } from './modules/peer-review/peer-review.module';
import { EqualizationModule } from './modules/equalization/equalization.module';
import { RegisterPeerReviewDto } from './modules/peer-review/dto/register-peer-review.dto';
import { PeerReviewScoreDto } from './modules/peer-review/dto/peer-review-score.dto';
import { CyclesEqualizationModule } from './modules/cycles-equalization/cycles-equalization.module';
import { CyclesEqualizationService } from './modules/cycles-equalization/cycles-equalization.service';


@Module({
  imports: [
    UserModule,
    AuthModule,
    CyclesModule,
    SelfAssesmentModule,
    HistoryModule,
    PeerReviewModule,
    EqualizationModule, 
    RegisterPeerReviewDto, 
    PeerReviewScoreDto, CyclesEqualizationModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CyclesEqualizationService],
  exports: [PrismaService],
})
export class AppModule { }
