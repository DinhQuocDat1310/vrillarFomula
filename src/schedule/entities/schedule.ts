import { StatusSchedule } from '@prisma/client';
import { Team } from 'src/team/entities/team.entity';
import { TimeTableEvent } from 'src/timetable/entities/timetable';

export class Schedule {
  id?: string;
  dataMeetingKey: string;
  title: string;
  startDate: string;
  endDate: string;
  month: string;
  placeName: string;
  description: string;
  imgCountry: string;
  imgEvent: string;
  status?: StatusSchedule;
  titleSchedule?: string;
  teams?: Team[];
  timeTableEvent?: TimeTableEvent[];
}

export class BasicDataSchedule {
  id?: string;
  dataMeetingKey: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  month: string;
  imgCountry: string;
  placeName: string;
  imgEvent: string;
}
