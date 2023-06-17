import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Schedule, StatusSchedule } from '@prisma/client';
import * as moment from 'moment';
import { SCHEDULE_PER_PAGE } from 'src/constant/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkTimeToSort } from 'src/utils/date';

@Injectable()
export class ScheduleService {
  constructor(private readonly prismaService: PrismaService) {}

  getListSchedules = async (page: string): Promise<Array<Schedule>> => {
    if (Number(page) <= 0 || isNaN(Number(page)))
      throw new BadRequestException('Not found or Start with page: 1');
    try {
      const schedules = await this.prismaService.schedule.findMany({
        select: {
          id: true,
          status: true,
          title: true,
          startDate: true,
          endDate: true,
          month: true,
          placeName: true,
          dataMeetingKey: true,
          description: true,
          imgCountry: true,
          imgEvent: true,
          teams: {
            select: {
              id: true,
              name: true,
            },
          },
          timeTableEvent: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        take: SCHEDULE_PER_PAGE,
        skip: Number(page) ? (Number(page) - 1) * SCHEDULE_PER_PAGE : 0,
      });
      schedules.sort((a, b) => checkTimeToSort(a, b));
      return schedules;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  getListSchedulesCompleted = async (
    page: string,
  ): Promise<Array<Schedule>> => {
    if (Number(page) <= 0 || isNaN(Number(page)))
      throw new BadRequestException('Not found or Start with page: 1');
    try {
      const schedules = await this.prismaService.schedule.findMany({
        select: {
          id: true,
          status: true,
          title: true,
          startDate: true,
          endDate: true,
          month: true,
          placeName: true,
          dataMeetingKey: true,
          description: true,
          imgCountry: true,
          imgEvent: true,
          teams: {
            select: {
              id: true,
              name: true,
            },
          },
          timeTableEvent: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        where: {
          status: StatusSchedule.COMPLETED,
        },
        take: SCHEDULE_PER_PAGE,
        skip: Number(page) ? (Number(page) - 1) * SCHEDULE_PER_PAGE : 0,
      });
      schedules.sort((a, b) => checkTimeToSort(a, b));
      return schedules;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  getListSchedulesUpcoming = async (page: string): Promise<Array<Schedule>> => {
    if (Number(page) <= 0 || isNaN(Number(page)))
      throw new BadRequestException('Not found or Start with page: 1');
    try {
      const schedules = await this.prismaService.schedule.findMany({
        select: {
          id: true,
          status: true,
          title: true,
          startDate: true,
          endDate: true,
          month: true,
          placeName: true,
          dataMeetingKey: true,
          description: true,
          imgCountry: true,
          imgEvent: true,
          teams: {
            select: {
              id: true,
              name: true,
            },
          },
          timeTableEvent: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        where: {
          status: StatusSchedule.UPCOMING,
        },
        take: SCHEDULE_PER_PAGE,
        skip: Number(page) ? (Number(page) - 1) * SCHEDULE_PER_PAGE : 0,
      });
      schedules.sort((a, b) => checkTimeToSort(a, b));
      return schedules;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  viewListSchedulesByNamePlace = async (
    placeName: string,
  ): Promise<Array<Schedule>> => {
    try {
      return await this.prismaService.schedule.findMany({
        where: {
          placeName: {
            contains: placeName,
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };
}
