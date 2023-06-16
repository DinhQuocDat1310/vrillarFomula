import { BasicDataSchedule } from './../../src/schedule/entities/schedule';
import { StatusSchedule } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import cheerio, { Cheerio, CheerioAPI, Element } from 'cheerio';
import * as moment from 'moment';
import { EventResult } from 'src/event-result/entities/event-result';
import { Schedule } from 'src/schedule/entities/schedule';
import { TimeTableEvent } from 'src/timetable/entities/timetable';

const KEYS_RESULT: Array<string> = [
  'limiter1',
  'pos',
  'no',
  'driver',
  'car',
  'laps',
  'timeRetired',
  'points',
  'limiter2',
];
const KEYS_QUALIFYING: Array<string> = [
  'limiter1',
  'pos',
  'no',
  'driver',
  'car',
  'q1',
  'q2',
  'q3',
  'laps',
  'limiter2',
];

const KEYS_PRACTICE: Array<string> = [
  'limiter1',
  'pos',
  'no',
  'driver',
  'car',
  'time',
  'gap',
  'laps',
  'limiter2',
];

const formatDateRegion = (
  timeStart: string,
  timeEnd: string,
  hours: number,
): string => {
  const start = moment(
    `${moment(timeStart).add(hours, 'hours').hours()}:${moment(
      timeStart,
    ).minutes()}`,
    'H:m',
  );
  const end = moment(
    `${moment(timeEnd).add(hours, 'hours').hours()}:${moment(
      timeEnd,
    ).minutes()}`,
    'H:m',
  );
  const formattedStart = start.format('HH:mm');
  const formattedEnd = end.format('HH:mm');
  return `${formattedStart} - ${formattedEnd}`;
};

const fetchDataSchedule = async (): Promise<Array<Schedule>> => {
  const basicDataSchedule: AxiosResponse<any, any> = await axios.get(
    'https://www.formula1.com/en/racing/2023.html',
  );
  if (basicDataSchedule.status === 200) {
    const $: CheerioAPI = cheerio.load(basicDataSchedule.data);
    $('.event-item').first().remove();
    $('.event-item-link').first().remove();

    const completedEvent: Cheerio<Element> = $('.event-item-link');

    const finalResult: Array<Schedule> = [];
    for (const element of completedEvent) {
      const dataMeetingKey: string = $(element).attr('data-meetingkey');
      const placeName: string = $(element)
        .find('.event-details .event-place')
        .text()
        .trim();
      if (
        placeName === 'United States' ||
        placeName === 'Abu Dhabi' ||
        placeName === 'Canada' ||
        placeName === 'Italy'
      ) {
        continue;
      }
      const title: string = $(element).find('.card-title').text();
      const startDate: string = $(element).find('.start-date').text();
      const endDate: string = $(element).find('.end-date').text();
      const month: string = $(element).find('.month-wrapper').text();
      const imgCountry: string = $(element)
        .find('.country-flag img')
        .attr('data-src');
      const description: string = $(element)
        .find('.event-details .event-title')
        .text();
      const imgEvent: string = $(element)
        .find('.event-details .event-image img')
        .attr('data-src');
      const dataTimeTable: Schedule = await fetchAdditionalDataSchedule(
        placeName,
        {
          dataMeetingKey,
          title,
          startDate,
          endDate,
          description,
          month,
          imgCountry,
          placeName,
          imgEvent,
        },
      );
      finalResult.push(dataTimeTable);
    }
    return finalResult;
  } else {
    console.log(
      'Failed to seed data drivers. Try again.',
      basicDataSchedule.status,
    );
  }
};

const fetchAdditionalDataSchedule = async (
  placeName: string,
  basicDataSchedule: BasicDataSchedule,
): Promise<Schedule> => {
  const additionalDataSchedule: AxiosResponse<any, any> = await axios.get(
    `https://www.formula1.com/en/racing/2023/${placeName.replace(
      / /g,
      '_',
    )}.html`,
  );
  if (additionalDataSchedule.status === 200) {
    const $: CheerioAPI = cheerio.load(additionalDataSchedule.data);
    const dataTimeTableRow: Cheerio<Element> = $('.f1-timetable--row');
    const titleRaceHub: Cheerio<Element> = $('.f1-race-hub--timetable');
    const titleSchedule: string = $(titleRaceHub)
      .find('.container .row h2')
      .text();
    const listTitles: Array<string> = [];
    const timeTable: Array<TimeTableEvent> = [];
    let statusSchedule: StatusSchedule;
    dataTimeTableRow.each((i: number, element) => {
      const title: string = $(element)
        .find('.f1-timetable--title')
        .text()
        .trim();
      const formatTitle: string = title.toLowerCase().replace(' ', '-');
      listTitles.push(formatTitle);
    });
    const now: moment.Moment = moment();
    for (const title of listTitles) {
      const dataTimeTable: Cheerio<Element> = $(`.js-${title}`);
      let eventResult: Array<EventResult> = [];
      for (const element of dataTimeTable) {
        const timeStart: string = $(element).attr('data-start-time');
        const timeEnd: string = $(element).attr('data-end-time');
        const dateStart: string = moment(timeStart).format('DD');
        const monthStart: string = moment(timeStart)
          .format('MMM')
          .toUpperCase();
        const dateEnd: string = moment(timeEnd).format('DD');
        const monthEnd: string = moment(timeEnd).format('MMM').toUpperCase();
        let date: string = dateStart + ' - ' + dateEnd;
        let month: string = monthStart + ' - ' + monthEnd;
        if (monthStart === monthEnd) {
          month = monthStart;
        }
        if (dateStart === dateEnd) {
          date = dateStart;
        }
        let description: string = $(element)
          .find('.f1-flag--finish')
          .text()
          .trim();

        if (!description) {
          if (placeName === 'Great Britain') {
            description = formatDateRegion(timeStart, timeEnd, 6);
          } else if (placeName === 'Singapore') {
            description = formatDateRegion(timeStart, timeEnd, 23);
          } else if (placeName === 'Japan') {
            description = formatDateRegion(timeStart, timeEnd, 22);
          } else if (placeName === 'Qatar') {
            description = formatDateRegion(timeStart, timeEnd, 4);
          } else if (placeName === 'Mexico') {
            description = formatDateRegion(timeStart, timeEnd, -11);
          } else if (placeName === 'Brazil') {
            description = formatDateRegion(timeStart, timeEnd, 10);
          } else {
            description = formatDateRegion(timeStart, timeEnd, 5);
          }
        }

        const currentMonth: string = now.format('MMM');
        let monthOfSchedule: string = basicDataSchedule.month;
        if (basicDataSchedule.month.length === 7) {
          monthOfSchedule = basicDataSchedule.month.slice(4);
        }
        const parseCurrentMonth: moment.Moment = moment(currentMonth, 'MMM');
        const parseCurrentMonthOfSchedule: moment.Moment = moment(
          monthOfSchedule,
          'MMM',
        );

        if (
          parseCurrentMonthOfSchedule.isBefore(parseCurrentMonth) ||
          parseCurrentMonthOfSchedule.isSame(parseCurrentMonth)
        ) {
          statusSchedule = StatusSchedule.COMPLETED;
          eventResult = await switchRouteEventResult(
            basicDataSchedule.dataMeetingKey,
            placeName,
            title,
          );
          for (let index = 0; index < eventResult.length; index++) {
            delete eventResult[index].limiter1;
            delete eventResult[index].limiter2;
          }
        } else {
          statusSchedule = StatusSchedule.UPCOMING;
        }
        timeTable.push({
          title,
          date,
          month,
          description,
          eventResults: eventResult,
        });
      }
    }
    const uniqueTimeTable: Array<TimeTableEvent> = timeTable.filter(
      (item: any, index) => {
        return (
          timeTable.findIndex((obj: any) => obj.title === item.title) === index
        );
      },
    );

    uniqueTimeTable[0].description =
      uniqueTimeTable[0].description.split(' ')[0];

    basicDataSchedule['timeTableEvent'] = uniqueTimeTable;
    basicDataSchedule['titleSchedule'] = titleSchedule;
    basicDataSchedule['status'] = statusSchedule;
    return {
      ...basicDataSchedule,
    };
  } else {
    console.log(
      'Failed to seed data schedules. Try again.',
      additionalDataSchedule.status,
    );
  }
};

const switchRouteEventResult = async (
  dataMeetingKey: string,
  placeName: string,
  titleTimeTable: string,
): Promise<Array<EventResult>> => {
  switch (titleTimeTable) {
    case 'qualifying':
    case 'practice-1':
    case 'practice-2':
    case 'practice-3':
    case 'sprint-shootout':
      return await fetchDataEventResult(
        dataMeetingKey,
        placeName,
        titleTimeTable,
      );
    default:
      return await fetchDataEventResult(
        dataMeetingKey,
        placeName,
        titleTimeTable + '-result',
      );
  }
};

const fetchDataEventResult = async (
  dataMeetingKey: string,
  placeName: string,
  titleTimeTable: string,
): Promise<Array<EventResult>> => {
  const eventResult: AxiosResponse<any, any> = await axios.get(
    `https://www.formula1.com/en/results.html/2023/races/${dataMeetingKey}/${placeName
      .toLowerCase()
      .replace(/ /g, '_')}/${titleTimeTable}.html`,
  );
  if (eventResult.status !== 200) {
    console.log('Failed to seed data drivers. Try again.', eventResult.status);
    return;
  }
  const $: CheerioAPI = cheerio.load(eventResult.data);
  const resultTableBodyFinal: Cheerio<Element> = $('tbody tr');
  const resultAllRow: Array<Array<string>> = [];
  resultTableBodyFinal.each((i: number, row) => {
    const rowValues: Array<string> = [];
    $(row)
      .find('td')
      .each((j: number, cell) => {
        rowValues.push($(cell).text().replace(/\s+/g, ''));
      });
    resultAllRow.push(rowValues);
  });
  const finalResult: Array<EventResult> = [];

  if (titleTimeTable.includes('result')) {
    for (let i = 0; i < resultAllRow.length; i++) {
      const headerTable: any = {};
      for (let j = 0; j < KEYS_RESULT.length; j++) {
        headerTable[KEYS_RESULT[j]] = resultAllRow[i][j];
      }
      finalResult.push(headerTable);
    }
  }
  if (
    titleTimeTable.includes('qualifying') ||
    titleTimeTable.includes('sprint-shootout')
  ) {
    for (let i = 0; i < resultAllRow.length; i++) {
      const headerTable: any = {};
      for (let j = 0; j < KEYS_QUALIFYING.length; j++) {
        headerTable[KEYS_QUALIFYING[j]] = resultAllRow[i][j];
      }
      finalResult.push(headerTable);
    }
  }
  if (
    titleTimeTable.includes('1') ||
    titleTimeTable.includes('2') ||
    titleTimeTable.includes('3')
  ) {
    for (let i = 0; i < resultAllRow.length; i++) {
      const headerTable: any = {};
      for (let j = 0; j < KEYS_PRACTICE.length; j++) {
        headerTable[KEYS_PRACTICE[j]] = resultAllRow[i][j];
      }
      finalResult.push(headerTable);
    }
  }
  return finalResult;
};

export const schedules = async (): Promise<Array<Schedule>> => {
  return await fetchDataSchedule();
};
