import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Driver, Prisma } from '@prisma/client';
import { DRIVER_BY_NAME_PER_PAGE, DRIVER_PER_PAGE } from 'src/constant/driver';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListDrivers } from './entities/driver';

@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService) {}

  getListDriversSortByRank = async (
    page: string,
    sortMethod: Prisma.SortOrder,
  ): Promise<Array<ListDrivers>> => {
    let sortType = sortMethod.toLowerCase();
    if (Number(page) <= 0 || isNaN(Number(page)))
      throw new BadRequestException('Not found or Start with page: 1');
    if (sortType !== 'asc' && sortType !== 'desc')
      throw new BadRequestException('Sort method available: [ASC|DESC]');
    try {
      return await this.prisma.driver.findMany({
        select: {
          id: true,
          name: true,
          rank: true,
          points: true,
          imgCountry: true,
          imgNumber: true,
          team: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take: DRIVER_PER_PAGE,
        skip: Number(page) ? (Number(page) - 1) * DRIVER_PER_PAGE : 0,
        orderBy: {
          rank: sortMethod,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  getListDriversSortByPoints = async (
    page: string,
    sortMethod: Prisma.SortOrder,
  ): Promise<Array<ListDrivers>> => {
    let sortType = sortMethod.toLowerCase();
    if (Number(page) <= 0 || isNaN(Number(page)))
      throw new BadRequestException('Not found or Start with page: 1');
    if (sortType !== 'asc' && sortType !== 'desc')
      throw new BadRequestException('Sort method available: [ASC|DESC]');
    try {
      return await this.prisma.driver.findMany({
        select: {
          id: true,
          name: true,
          rank: true,
          points: true,
          imgCountry: true,
          imgNumber: true,
          team: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take: DRIVER_PER_PAGE,
        skip: Number(page) ? (Number(page) - 1) * DRIVER_PER_PAGE : 0,
        orderBy: {
          points: sortMethod,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  getDetailOfDriver = async (id: string): Promise<Driver> => {
    try {
      return await this.findDriverByID(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  findDriverByID = async (id: string): Promise<Driver> => {
    const driver = await this.prisma.driver.findFirst({
      where: {
        id,
      },
    });
    if (!driver) throw new BadRequestException('Driver not found');
    return driver;
  };

  viewAllDriversByTeamNameLike = async (
    teamName: string,
  ): Promise<Array<Driver>> => {
    try {
      return await this.prisma.driver.findMany({
        where: {
          team: {
            OR: [
              {
                name: {
                  contains: teamName,
                },
              },
              {
                fullTeamName: {
                  contains: teamName,
                },
              },
            ],
          },
        },
        orderBy: {
          points: 'desc',
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  };

  viewAllDriversByNameLike = async (name: string): Promise<ListDrivers[]> => {
    try {
      return await this.prisma.driver.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        select: {
          id: true,
          name: true,
          rank: true,
          points: true,
          imgCountry: true,
          imgNumber: true,
          team: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };
}
