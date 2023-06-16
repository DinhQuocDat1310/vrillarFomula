import { Module } from '@nestjs/common';
import { ScheduleService } from './service';
import { ScheduleController } from './controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
})
export class ScheduleModule {}
