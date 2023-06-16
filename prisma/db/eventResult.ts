import axios from 'axios';
import cheerio, { Cheerio, CheerioAPI, Element } from 'cheerio';
import * as moment from 'moment';

const formatDateRegion = (timeStart: any, timeEnd: any, hours: any) => {
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

const fetchDataEventResult = async () => {
  //   const basicDataSchedule = await axios.get(
  //     'https://www.formula1.com/en/racing/2023.html',
  //   );
  //   if (basicDataSchedule.status === 200) {
  //     const $: CheerioAPI = cheerio.load(basicDataSchedule.data);
  //     $('.event-item').first().remove();
  //     $('.event-item-link').first().remove();
  //     const completedEvent: Cheerio<Element> = $('.event-item-link');
  //     const finalResult = [];
  //     for (const element of completedEvent) {
  //       const dataMeetingKey = $(element).attr('data-meetingkey');
  //       const placeName: string = $(element)
  //         .find('.event-details .event-place')
  //         .text()
  //         .trim();
  //       if (
  //         placeName === 'United States' ||
  //         placeName === 'Abu Dhabi' ||
  //         placeName === 'Canada' ||
  //         placeName === 'Italy'
  //       ) {
  //         continue;
  //       }
  //       const title: string = $(element).find('.card-title').text();
  //       const startDate: string = $(element).find('.start-date').text();
  //       const endDate: string = $(element).find('.end-date').text();
  //       const month: string = $(element).find('.month-wrapper').text();
  //       const imgCountry: string = $(element)
  //         .find('.country-flag img')
  //         .attr('data-src');
  //       const description: string = $(element)
  //         .find('.event-details .event-title')
  //         .text();
  //       const imgEvent: string = $(element)
  //         .find('.event-details .event-image img')
  //         .attr('data-src');
  //       const dataTimeTable = await fetchAdditionalDataSchedule(placeName, {
  //         dataMeetingKey,
  //         title,
  //         startDate,
  //         endDate,
  //         description,
  //         month,
  //         imgCountry,
  //         placeName,
  //         imgEvent,
  //       });
  //       finalResult.push(dataTimeTable);
  //     }
  //     return finalResult;
  //   } else {
  //     console.log(
  //       'Failed to seed data drivers. Try again.',
  //       basicDataSchedule.status,
  //     );
  //   }
};

const fetchAdditionalDataEventResult = async (
  placeName: string,
  basicDataSchedule: Object,
) => {
  const additionalDataSchedule = await axios.get(
    `https://www.formula1.com/en/racing/2023/${placeName.replace(
      / /g,
      '_',
    )}.html`,
  );
  if (additionalDataSchedule.status === 200) {
    const $ = cheerio.load(additionalDataSchedule.data);
    const dataTimeTableRow: Cheerio<Element> = $('.f1-timetable--row');
    const titleRaceHub: Cheerio<Element> = $('.f1-race-hub--timetable');
    const titleSchedule = $(titleRaceHub).find('.container .row h2').text();
    const listTitles: any = [];
    const timeTable: Array<object> = [];
    dataTimeTableRow.each((i, element) => {
      const title = $(element).find('.f1-timetable--title').text().trim();
      const formatTitle = title.toLowerCase().replace(' ', '-');
      listTitles.push(formatTitle);
    });

    for (const title of listTitles) {
      const dataTimeTable: Cheerio<Element> = $(`.js-${title}`);
      dataTimeTable.each((i, element) => {
        const timeStart = $(element).attr('data-start-time');
        const timeEnd = $(element).attr('data-end-time');
        const dateStart = moment(timeStart).format('DD');
        const monthStart = moment(timeStart).format('MMM').toUpperCase();
        const dateEnd = moment(timeEnd).format('DD');
        const monthEnd = moment(timeEnd).format('MMM').toUpperCase();
        let date: string = dateStart + ' - ' + dateEnd;
        let month: string = monthStart + ' - ' + monthEnd;
        if (monthStart === monthEnd) {
          month = monthStart;
        }
        if (dateStart === dateEnd) {
          date = dateStart;
        }
        let description: any = $(element)
          .find('.f1-flag--finish')
          .text()
          .trim();

        if (!description) {
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
        }
        timeTable.push({
          title,
          date,
          month,
          description,
        });
      });
    }
    const uniqueTimeTable: Array<any> = timeTable.filter((item: any, index) => {
      return (
        timeTable.findIndex((obj: any) => obj.title === item.title) === index
      );
    });

    uniqueTimeTable[0].description =
      uniqueTimeTable[0].description.split(' ')[0];

    basicDataSchedule['timeTableEvent'] = uniqueTimeTable;
    basicDataSchedule['titleSchedule'] = titleSchedule;
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

export const eventResults = async () => {
  return await fetchDataEventResult();
};
