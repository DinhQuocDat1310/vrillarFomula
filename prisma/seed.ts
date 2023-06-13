import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../src/prisma/prisma.service';
import { drivers } from './db/driver';
import { teams } from './db/team';

async function main() {
  const prisma: PrismaService = new PrismaService();
  const logger: Logger = new Logger();
  const dataTeam: any = await teams();
  const dataDriver: any = await drivers();
  try {
    for (let index = 0; index < dataTeam.length; index++) {
      const {
        name,
        fullTeamName,
        base,
        rank,
        points,
        teamChief,
        technicalChief,
        chassis,
        powerUnit,
        firstTeamEntry,
        worldChampionships,
        highestRaceFinish,
        polePositions,
        fastestLaps,
        imgLogo,
        imgTeamCar,
        imgBrandLogo,
        intro,
        teamProfile,
      } = dataTeam[index];

      await prisma.team.create({
        data: {
          name,
          fullTeamName,
          base,
          rank,
          points,
          teamChief,
          technicalChief,
          chassis,
          powerUnit,
          firstTeamEntry,
          worldChampionships,
          highestRaceFinish,
          polePositions,
          fastestLaps,
          imgLogo,
          imgBrandLogo,
          imgTeamCar,
          intro,
          teamProfile: {
            createMany: {
              data: teamProfile,
            },
          },
        },
      });
    }

    for (let index = 0; index < dataDriver.length; index++) {
      const {
        name,
        points,
        country,
        podiums,
        grandsPrixEntered,
        worldChampionships,
        highestGridPosition,
        highestRaceFinish,
        dateOfBirth,
        placeOfBirth,
        rank,
        imgCountry,
        imgDriver,
        imgNumber,
        biography,
        team,
      } = dataDriver[index];
      const teamFound = await prisma.team.findFirst({
        where: {
          name: team,
        },
      });
      await prisma.driver.create({
        data: {
          name,
          points,
          country,
          podiums,
          grandsPrixEntered,
          worldChampionships,
          highestGridPosition,
          highestRaceFinish,
          dateOfBirth,
          placeOfBirth,
          biography,
          imgCountry,
          imgDriver,
          imgNumber,
          rank,
          teamId: teamFound.id,
        },
      });
    }
  } catch (error) {
    logger.error(error);
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
}

main();
