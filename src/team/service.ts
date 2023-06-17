import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TEAM_PER_PAGE } from 'src/constant/team';
import { ListTeams } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  getListTeamsSortByRank = async (
    page: string,
    sortMethod: Prisma.SortOrder,
  ): Promise<Array<ListTeams>> => {
    let sortType = sortMethod.toLowerCase();
    if (Number(page) <= 0 || isNaN(Number(page)))
      throw new BadRequestException('Not found or Start with page: 1');
    if (sortType !== 'asc' && sortType !== 'desc')
      throw new BadRequestException('Sort method available: [ASC|DESC]');
    try {
      return await this.prisma.team.findMany({
        select: {
          id: true,
          name: true,
          rank: true,
          points: true,
          imgTeamCar: true,
          imgLogo: true,
          driver: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take: TEAM_PER_PAGE,
        skip: Number(page) ? (Number(page) - 1) * TEAM_PER_PAGE : 0,
        orderBy: {
          rank: sortMethod,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  getListTeamsSortByPoints = async (
    page: string,
    sortMethod: Prisma.SortOrder,
  ): Promise<Array<ListTeams>> => {
    let sortType = sortMethod.toLowerCase();
    if (Number(page) <= 0 || isNaN(Number(page)))
      throw new BadRequestException('Not found or Start with page: 1');
    if (sortType !== 'asc' && sortType !== 'desc')
      throw new BadRequestException('Sort method available: [ASC|DESC]');
    try {
      return await this.prisma.team.findMany({
        select: {
          id: true,
          name: true,
          rank: true,
          points: true,
          imgTeamCar: true,
          imgLogo: true,
          driver: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take: TEAM_PER_PAGE,
        skip: Number(page) ? (Number(page) - 1) * TEAM_PER_PAGE : 0,
        orderBy: {
          points: sortMethod,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  viewAllTeamsByTeamNameLike = async (
    teamName: string,
  ): Promise<Array<Team>> => {
    try {
      return await this.prisma.team.findMany({
        where: {
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
        orderBy: {
          points: 'desc',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  getDetailOfTeam = async (id: string): Promise<Team> => {
    try {
      return await this.findTeamByID(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  findTeamByID = async (id: string): Promise<Team> => {
    const team = await this.prisma.team.findFirst({
      where: {
        id,
      },
    });
    if (!team) throw new BadRequestException('Team not found');
    return team;
  };
}
