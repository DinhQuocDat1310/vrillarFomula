import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { TimetableService } from './service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TimeTableEvent } from '@prisma/client';

@Controller('timetable')
@ApiTags('Timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get('/viewList')
  @ApiOkResponse({ description: 'Success view list Timetable' })
  @ApiBadRequestResponse({ description: 'Failed view list Timetable' })
  @ApiOperation({ summary: 'View list all Timetable per Page' })
  @HttpCode(HttpStatus.OK)
  async findAllTimetable(
    @Query('page') page: string,
  ): Promise<Array<TimeTableEvent>> {
    return await this.timetableService.getListTimetable(page);
  }

  @Get('/viewBySchedule/:id')
  @ApiOkResponse({ description: 'Success view detail Timetable' })
  @ApiBadRequestResponse({ description: 'Failed view detail Timetable' })
  @ApiOperation({
    summary:
      'View details of Timetable belong to Schedule [View by ID Schedule]',
  })
  @HttpCode(HttpStatus.OK)
  async viewDetailTimetableByIDSchedule(
    @Param('id') id: string,
  ): Promise<TimeTableEvent> {
    return await this.timetableService.getDetailOfTimetableBelongToSchedule(id);
  }

  @Get('/viewDetail/:id')
  @ApiOkResponse({ description: 'Success view detail Timetable' })
  @ApiBadRequestResponse({ description: 'Failed view detail Timetable' })
  @ApiOperation({ summary: 'View details of Timetable [View by ID Timetable]' })
  @HttpCode(HttpStatus.OK)
  async viewDetailTimetable(@Param('id') id: string): Promise<TimeTableEvent> {
    return await this.timetableService.getDetailOfTimetable(id);
  }
}
