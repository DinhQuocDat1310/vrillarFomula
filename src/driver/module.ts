import { Module } from '@nestjs/common';
import { DriverService } from './service';
import { DriverController } from './controller';

@Module({
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
