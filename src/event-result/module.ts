import { Module } from '@nestjs/common';
import { EventResultService } from './service';
import { EventResultController } from './controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EventResultController],
  providers: [EventResultService, PrismaService],
})
export class EventResultModule {}
