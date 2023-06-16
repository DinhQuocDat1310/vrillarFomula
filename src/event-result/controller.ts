import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { EventResultService } from './service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EventResult } from '@prisma/client';

@Controller('event-result')
@ApiTags('Event result')
export class EventResultController {
  constructor(private readonly eventResultService: EventResultService) {}

  @Get('/listSortPoints')
  @ApiOkResponse({
    description: 'Success view list Event result',
  })
  @ApiBadRequestResponse({ description: 'Failed view list Event result' })
  @ApiOperation({
    summary: 'View list all Event result per Page [Sort by Points]',
  })
  @HttpCode(HttpStatus.OK)
  async findAllEventResultSortByPoint(
    @Query('page') page: string,
  ): Promise<Array<EventResult>> {
    return await this.eventResultService.getListEventResultSortByPoint(page);
  }

  @Get('/viewList')
  @ApiOkResponse({
    description: 'Success view list Event result [Sort by Laps]',
  })
  @ApiBadRequestResponse({ description: 'Failed view list Event result' })
  @ApiOperation({
    summary: 'View list all Event result per Page [Sort by Laps]',
  })
  @HttpCode(HttpStatus.OK)
  async findAllEventResultSortByLaps(
    @Query('page') page: string,
  ): Promise<Array<EventResult>> {
    return await this.eventResultService.getListEventResultSortByLaps(page);
  }

  @Get('/eventResultOfTimetable/:id')
  @ApiOkResponse({
    description: 'Success view all Event Result of Timetable',
  })
  @ApiBadRequestResponse({ description: 'Failed view all Event result' })
  @ApiOperation({
    summary:
      'View all Event result of Timetable [View Event Result by Timetable ID]',
  })
  @HttpCode(HttpStatus.OK)
  async viewAllEventResultBelongTimetable(
    @Param('id') id: string,
  ): Promise<Array<EventResult>> {
    return await this.eventResultService.viewAllEventResultBelongTimetable(id);
  }

  @Get('/viewDetail/:id')
  @ApiOkResponse({ description: 'Success view detail Event result' })
  @ApiBadRequestResponse({ description: 'Failed view detail Event result' })
  @ApiOperation({
    summary: 'View details of Event result [View by ID Event result]',
  })
  @HttpCode(HttpStatus.OK)
  async viewDetailEventResult(@Param('id') id: string): Promise<EventResult> {
    return await this.eventResultService.getDetailOfEventResult(id);
  }
}
