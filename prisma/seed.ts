import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../src/prisma/prisma.service';
import { drivers } from './db/driver';
import { teams } from './db/team';
import { schedules } from './db/schedule';

async function main() {
  const prisma: PrismaService = new PrismaService();
  const logger: Logger = new Logger();
  const dataTeam: any = await teams();
  const dataDriver: any = await drivers();
  const dataSchedule: any = await schedules();

  try {
    for (let index = 0; index < dataSchedule.length; index++) {
      const {
        title,
        dataMeetingKey,
        startDate,
        endDate,
        month,
        description,
        placeName,
        imgEvent,
        imgCountry,
        titleSchedule,
        timeTableEvent,
      } = dataSchedule[index];

      await prisma.schedule.create({
        data: {
          title,
          dataMeetingKey,
          startDate,
          endDate,
          month,
          description,
          placeName,
          imgCountry,
          imgEvent,
        },
      });
      const scheduleFound = await prisma.schedule.findFirst({
        where: {
          description: titleSchedule,
        },
      });

      for (let j = 0; j < timeTableEvent.length; j++) {
        await prisma.timeTableEvent.create({
          data: {
            title: timeTableEvent[j].title,
            date: timeTableEvent[j].date,
            month: timeTableEvent[j].month,
            description: timeTableEvent[j].description,
            schedule: {
              connect: {
                id: scheduleFound.id,
              },
            },
          },
        });
      }
    }

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
          team: {
            connect: {
              id: teamFound.id,
            },
          },
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
