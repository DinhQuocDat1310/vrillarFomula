import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ScheduleService } from './service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Schedule } from '@prisma/client';

@Controller('schedule')
@ApiTags('Schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/viewList')
  @ApiOkResponse({ description: 'Success view list Schedules' })
  @ApiBadRequestResponse({ description: 'Failed view list Schedules' })
  @ApiOperation({ summary: 'View list all Schedules per Page' })
  @HttpCode(HttpStatus.OK)
  async findAllSchedule(@Query('page') page: string): Promise<Array<Schedule>> {
    return await this.scheduleService.getListSchedules(page);
  }

  @Get('/listCompleted')
  @ApiOkResponse({ description: 'Success view list Schedules completed' })
  @ApiBadRequestResponse({
    description: 'Failed view list Schedules completed',
  })
  @ApiOperation({
    summary: 'View list all Schedules completed per Page',
  })
  @HttpCode(HttpStatus.OK)
  async findAllScheduleCompleted(
    @Query('page') page: string,
  ): Promise<Array<Schedule>> {
    return await this.scheduleService.getListSchedulesCompleted(page);
  }

  @Get('/listUpcoming')
  @ApiOkResponse({ description: 'Success view list Schedules upcoming' })
  @ApiBadRequestResponse({
    description: 'Failed view list Schedules upcoming',
  })
  @ApiOperation({
    summary: 'View list all Schedules upcoming per Page',
  })
  @HttpCode(HttpStatus.OK)
  async findAllScheduleUpcoming(
    @Query('page') page: string,
  ): Promise<Array<Schedule>> {
    return await this.scheduleService.getListSchedulesUpcoming(page);
  }
}
