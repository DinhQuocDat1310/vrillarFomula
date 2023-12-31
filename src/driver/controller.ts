import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DriverService } from './service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Driver, Prisma } from '@prisma/client';
import { ListDrivers } from './entities/driver';

@Controller('driver')
@ApiTags('Driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('/listSortRank')
  @ApiOkResponse({ description: 'Success view list Drivers' })
  @ApiBadRequestResponse({ description: 'Failed view list Drivers' })
  @ApiOperation({ summary: 'View list all Drivers per Page [Sort by Rank]' })
  @HttpCode(HttpStatus.OK)
  async findAllDriversSortByRank(
    @Query('page') page: string,
    @Query('sortMethod') sortMethod: Prisma.SortOrder,
  ): Promise<Array<ListDrivers>> {
    return await this.driverService.getListDriversSortByRank(page, sortMethod);
  }

  @Get('/listSortPoints')
  @ApiOkResponse({ description: 'Success view list Drivers' })
  @ApiBadRequestResponse({ description: 'Failed view list Drivers' })
  @ApiOperation({ summary: 'View list all Drivers per Page [Sort by Points]' })
  @HttpCode(HttpStatus.OK)
  async findAllDriversSortByPoints(
    @Query('page') page: string,
    @Query('sortMethod') sortMethod: Prisma.SortOrder,
  ): Promise<Array<ListDrivers>> {
    return await this.driverService.getListDriversSortByPoints(
      page,
      sortMethod,
    );
  }

  @Get('/listByTeam/:teamName')
  @ApiOkResponse({ description: 'Success view list Drivers' })
  @ApiBadRequestResponse({ description: 'Failed view list Drivers' })
  @ApiOperation({
    summary:
      'View list Driver by Team name like [View by Team name or Full team name like]',
  })
  @HttpCode(HttpStatus.OK)
  async viewAllDriversByTeamNameLike(
    @Param('teamName') teamName: string,
  ): Promise<Array<Driver>> {
    return await this.driverService.viewAllDriversByTeamNameLike(teamName);
  }

  @Get('/listByName/:name')
  @ApiOkResponse({ description: 'Success view list Drivers' })
  @ApiBadRequestResponse({ description: 'Failed view list Drivers' })
  @ApiOperation({
    summary: 'View list Driver by Name like [View by Name like]',
  })
  @HttpCode(HttpStatus.OK)
  async viewAllDriversByNameLike(
    @Param('name') name: string,
  ): Promise<ListDrivers[]> {
    return await this.driverService.viewAllDriversByNameLike(name);
  }

  @Get('/viewDetail/:id')
  @ApiOkResponse({ description: 'Success view detail Drivers' })
  @ApiBadRequestResponse({ description: 'Failed view detail Drivers' })
  @ApiOperation({ summary: 'View details of Driver [View by ID Driver]' })
  @HttpCode(HttpStatus.OK)
  async viewDetailDriver(@Param('id') id: string): Promise<Driver> {
    return await this.driverService.getDetailOfDriver(id);
  }
}
