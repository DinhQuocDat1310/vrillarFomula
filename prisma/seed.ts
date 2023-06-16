import { Logger } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { drivers } from './db/driver';
import { teams } from './db/team';
import { schedules } from './db/schedule';
import { Driver } from 'src/driver/entities/driver';
import { Team } from 'src/team/entities/team.entity';
import { Schedule } from 'src/schedule/entities/schedule';

async function main() {
  const prisma: PrismaService = new PrismaService();
  const logger: Logger = new Logger();
  const dataTeam: Array<Team> = await teams();
  const dataDriver: Array<Driver> = await drivers();
  const dataSchedule: Array<Schedule> = await schedules();

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
        status,
      } = dataSchedule[index];
      await prisma.schedule.create({
        data: {
          title,
          dataMeetingKey,
          startDate,
          endDate,
          month,
          status,
          description,
          placeName,
          imgCountry,
          imgEvent,
        },
      });
      const scheduleFound: Schedule = await prisma.schedule.findFirst({
        where: {
          description: titleSchedule,
        },
      });

      for (let j = 0; j < timeTableEvent.length; j++) {
        const { eventResults } = timeTableEvent[j];
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
            eventResult: {
              createMany: {
                data: eventResults,
              },
            },
          },
        });
      }
    }

    const allSchedules: Array<Schedule> = await prisma.schedule.findMany({
      where: {
        status: 'COMPLETED',
      },
    });

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

    const allTeams: Array<Team> = await prisma.team.findMany();
    for (const schedule of allSchedules) {
      await Promise.all(
        allTeams.map((team: Team) =>
          prisma.schedule.update({
            where: {
              id: schedule.id,
            },
            data: {
              teams: {
                connect: {
                  id: team.id,
                },
              },
            },
          }),
        ),
      );
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
      const teamFound: Team = await prisma.team.findFirst({
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
