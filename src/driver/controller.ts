import { Controller } from '@nestjs/common';
import { DriverService } from './service';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}
}
