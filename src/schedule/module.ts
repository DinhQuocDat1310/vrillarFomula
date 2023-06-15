import { Module } from '@nestjs/common';
import { ScheduleService } from './service';
import { ScheduleController } from './controller';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
