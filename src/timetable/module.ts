import { Module } from '@nestjs/common';
import { TimetableService } from './service';
import { TimetableController } from './controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TimetableController],
  providers: [TimetableService, PrismaService],
})
export class TimetableModule {}
