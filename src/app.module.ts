import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import {HistoryModule} from './modules/history/history.module';
import { PeerReviewModule } from './modules/peer-review/peer-review.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    HistoryModule,
    PeerReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
