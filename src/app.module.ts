import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CyclesModule } from './modules/cycles/cycles.module';
import { PrismaService } from './database/prisma.service';
import { SelfAssesmentModule } from './modules/self-assesment/self-assesment.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CyclesModule,
    SelfAssesmentModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule { }
