import { Module } from '@nestjs/common';
import { TeamModule } from './team/module';
import { DriverModule } from './driver/module';
import { ScheduleModule } from './schedule/module';
import { AppConfigService } from './config/appConfigService';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    DriverModule,
    TeamModule,
    ScheduleModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [AppConfigService, PrismaService],
})
export class AppModule {}
