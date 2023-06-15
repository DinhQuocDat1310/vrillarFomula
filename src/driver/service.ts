import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DRIVER_PER_PAGE } from 'src/constant/driver';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService) {}

  getListDriversSortByRank = async (
    page: string,
    sortMethod: Prisma.SortOrder,
  ) => {
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
  ) => {
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

  getDetailOfDriver = async (id: string) => {
    return await this.findDriverByID(id);
  };

  findDriverByID = async (id: string) => {
    const driver = await this.prisma.driver.findFirst({
      where: {
        id,
      },
    });
    if (!driver) throw new BadRequestException('Driver not found');
    return driver;
  };
}
