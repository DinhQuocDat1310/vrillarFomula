import { Schedule, TeamProfile } from '@prisma/client';
import { Driver } from 'src/driver/entities/driver';

export class Team {
  id?: string;
  name: string;
  fullTeamName: string;
  base: string;
  rank: number;
  points: number;
  teamChief: string;
  technicalChief: string;
  chassis: string;
  powerUnit: string;
  firstTeamEntry: string;
  intro: string;
  worldChampionships: string;
  highestRaceFinish: string;
  polePositions: string;
  fastestLaps: string;
  imgLogo: string;
  imgTeamCar: string;
  imgBrandLogo: string;
  driver?: Array<Driver>;
  teamProfile?: Array<ProfileTeam>;
  schedules?: Array<Schedule>;
}

export class BasicDataTeam {
  id?: string;
  name: string;
  rank: number;
  points: number;
  imgLogo: string;
  imgTeamCar: string;
}

export class DataTeamFormat {
  id?: string;
  fullTeamName: string;
  base: string;
  teamChief: string;
  technicalChief: string;
  chassis: string;
  powerUnit: string;
  firstTeamEntry: string;
  intro: string;
  worldChampionships: string;
  highestRaceFinish: string;
  polePositions: string;
  fastestLaps: string;
  imgBrandLogo: string;
  driver?: Array<Driver>;
  teamProfile?: Array<ProfileTeam>;
  schedules?: Array<Schedule>;
}

export class ProfileTeam {
  year: number;
  descriptionOfYear: string;
  teamId?: string;
}

export class ListTeams {
  rank: number;
  id: string;
  name: string;
  points: number;
  imgLogo: string;
  imgTeamCar: string;
  driver: Array<{
    id: string;
    name: string;
  }>;
}
