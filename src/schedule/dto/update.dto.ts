import { PartialType } from '@nestjs/swagger';
import { CreateScheduleDto } from './create.dto';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
