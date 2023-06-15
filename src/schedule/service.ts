import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create.dto';
import { UpdateScheduleDto } from './dto/update.dto';

@Injectable()
export class ScheduleService {
  create(createScheduleDto: CreateScheduleDto) {
    return 'This action adds a new schedule';
  }

  findAll() {
    return `This action returns all schedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
