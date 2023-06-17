import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TimeTableEvent } from '@prisma/client';
import { TIMETABLE_PER_PAGE } from 'src/constant/timetable';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkTimeToSort } from 'src/utils/date';

@Injectable()
export class TimetableService {
  constructor(private readonly prismaService: PrismaService) {}

  getListTimetable = async (page: string): Promise<Array<TimeTableEvent>> => {
    if (Number(page) <= 0 || isNaN(Number(page)))
      throw new BadRequestException('Not found or Start with page: 1');
    try {
      const timetables = await this.prismaService.timeTableEvent.findMany({
        select: {
          id: true,
          title: true,
          date: true,
          month: true,
          description: true,
          scheduleId: true,
          eventResult: {
            select: {
              id: true,
            },
          },
        },
        take: TIMETABLE_PER_PAGE,
        skip: Number(page) ? (Number(page) - 1) * TIMETABLE_PER_PAGE : 0,
      });
      timetables.sort((a, b) => checkTimeToSort(a, b));
      return timetables;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  getDetailOfTimetable = async (id: string): Promise<TimeTableEvent> => {
    return await this.findTimetableByID(id);
  };

  findTimetableByID = async (id: string): Promise<TimeTableEvent> => {
    const timetable = await this.prismaService.timeTableEvent.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        date: true,
        month: true,
        description: true,
        scheduleId: true,
        eventResult: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!timetable) throw new BadRequestException('Timetable not found');
    return timetable;
  };

  getDetailOfTimetableBelongToSchedule = async (
    id: string,
  ): Promise<TimeTableEvent> => {
    const timetable = await this.prismaService.timeTableEvent.findFirst({
      where: {
        scheduleId: id,
      },
    });
    if (!timetable) throw new BadRequestException('Timetable not found');
    return timetable;
  };
}
