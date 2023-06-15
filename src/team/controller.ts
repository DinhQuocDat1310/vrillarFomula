import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TeamService } from './service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@Controller('team')
@ApiTags('Team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/listSortRank')
  @ApiOkResponse({ description: 'Success view list Teams' })
  @ApiBadRequestResponse({ description: 'Failed view list Teams' })
  @ApiOperation({ summary: 'View list all Teams per Page [Sort by Rank]' })
  @HttpCode(HttpStatus.OK)
  async findAllTeamsSortByRank(
    @Query('page') page: string,
    @Query('sortMethod') sortMethod: Prisma.SortOrder,
  ) {
    return await this.teamService.getListTeamsSortByRank(page, sortMethod);
  }

  @Get('/listSortPoints')
  @ApiOkResponse({ description: 'Success view list Teams' })
  @ApiBadRequestResponse({ description: 'Failed view list Teams' })
  @ApiOperation({ summary: 'View list all Teams per Page [Sort by Points]' })
  @HttpCode(HttpStatus.OK)
  async findAllTeamsSortByPoints(
    @Query('page') page: string,
    @Query('sortMethod') sortMethod: Prisma.SortOrder,
  ) {
    return await this.teamService.getListTeamsSortByPoints(page, sortMethod);
  }

  @Get('/viewDetail/:id')
  @ApiOkResponse({ description: 'Success view detail Teams' })
  @ApiBadRequestResponse({ description: 'Failed view detail Teams' })
  @ApiOperation({ summary: 'View details of Team [View by ID Team]' })
  @HttpCode(HttpStatus.OK)
  async viewDetailDriver(@Param('id') id: string) {
    return await this.teamService.getDetailOfTeam(id);
  }
}
