import { EventResult } from 'src/event-result/entities/event-result';

export class TimeTableEvent {
  id?: string;
  title: string;
  date: string;
  month: string;
  description: string;
  eventResults?: Array<EventResult>;
  scheduleId?: string;
}
