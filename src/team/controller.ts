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
import { Prisma, Team } from '@prisma/client';
import { ListTeams } from './entities/team.entity';

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
  ): Promise<Array<ListTeams>> {
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
  ): Promise<Array<ListTeams>> {
    return await this.teamService.getListTeamsSortByPoints(page, sortMethod);
  }

  @Get('/listByTeam/:teamName')
  @ApiOkResponse({ description: 'Success view list Teams' })
  @ApiBadRequestResponse({ description: 'Failed view list Teams' })
  @ApiOperation({
    summary:
      'View list Team by Team name like [View by Team name or Full team name like]',
  })
  @HttpCode(HttpStatus.OK)
  async viewAllTeamByTeamNameLike(
    @Param('teamName') teamName: string,
  ): Promise<Array<Team>> {
    return await this.teamService.viewAllTeamsByTeamNameLike(teamName);
  }

  @Get('/viewDetail/:id')
  @ApiOkResponse({ description: 'Success view detail Teams' })
  @ApiBadRequestResponse({ description: 'Failed view detail Teams' })
  @ApiOperation({ summary: 'View details of Team [View by ID Team]' })
  @HttpCode(HttpStatus.OK)
  async viewDetailDriver(@Param('id') id: string): Promise<Team> {
    return await this.teamService.getDetailOfTeam(id);
  }
}
