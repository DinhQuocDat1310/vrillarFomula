import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EventResult } from '@prisma/client';
import { EVENT_RESULT_PER_PAGE } from 'src/constant/event-result';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventResultService {
  constructor(private readonly prismaService: PrismaService) {}

  getListEventResultSortByPoint = async (
    page: string,
  ): Promise<Array<EventResult>> => {
    if (Number(page) <= 0 || isNaN(Number(page)))
      throw new BadRequestException('Not found or Start with page: 1');
    try {
      const eventResults = await this.prismaService.eventResult.findMany({
        select: {
          id: true,
          pos: true,
          no: true,
          points: true,
          driver: true,
          car: true,
          time: true,
          timeRetired: true,
          laps: true,
          gap: true,
          q3: true,
          q2: true,
          q1: true,
          timeTableEventId: true,
        },
        take: EVENT_RESULT_PER_PAGE,
        skip: Number(page) ? (Number(page) - 1) * EVENT_RESULT_PER_PAGE : 0,
      });
      eventResults.sort((a, b) => Number(a.points) - Number(b.points));
      return eventResults;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  getListEventResultSortByLaps = async (
    page: string,
  ): Promise<Array<EventResult>> => {
    if (Number(page) <= 0 || isNaN(Number(page)))
      throw new BadRequestException('Not found or Start with page: 1');
    try {
      const eventResults = await this.prismaService.eventResult.findMany({
        select: {
          id: true,
          pos: true,
          no: true,
          points: true,
          driver: true,
          car: true,
          time: true,
          timeRetired: true,
          laps: true,
          gap: true,
          q3: true,
          q2: true,
          q1: true,
          timeTableEventId: true,
        },
        take: EVENT_RESULT_PER_PAGE,
        skip: Number(page) ? (Number(page) - 1) * EVENT_RESULT_PER_PAGE : 0,
      });
      eventResults.sort((a, b) => Number(a.laps) - Number(b.laps));
      return eventResults;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  getDetailOfEventResult = async (id: string): Promise<EventResult> => {
    return await this.findEventResultByID(id);
  };

  findEventResultByID = async (id: string): Promise<EventResult> => {
    const eventResult = await this.prismaService.eventResult.findFirst({
      where: {
        id,
      },
    });
    if (!eventResult) throw new BadRequestException('Event result not found');
    return eventResult;
  };

  viewAllEventResultBelongTimetable = async (
    id: string,
  ): Promise<Array<EventResult>> => {
    const eventResults = await this.prismaService.eventResult.findMany({
      where: {
        timeTableEventId: id,
      },
      select: {
        id: true,
        pos: true,
        no: true,
        points: true,
        driver: true,
        car: true,
        time: true,
        timeRetired: true,
        laps: true,
        gap: true,
        q3: true,
        q2: true,
        q1: true,
        timeTableEventId: true,
      },
    });
    if (!eventResults) throw new BadRequestException('Event result not found');
    return eventResults;
  };
}
