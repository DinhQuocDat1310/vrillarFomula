import { Module } from '@nestjs/common';
import { DriverService } from './service';
import { DriverController } from './controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DriverController],
  providers: [DriverService, PrismaService],
})
export class DriverModule {}
