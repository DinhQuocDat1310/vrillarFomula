import {
  BasicDataDriver,
  DataDriverFormat,
} from './../../src/driver/entities/driver';
import axios, { AxiosResponse } from 'axios';
import cheerio, { Cheerio, CheerioAPI, Element } from 'cheerio';
import { Driver } from 'src/driver/entities/driver';

const fetchDataDriver = async (): Promise<Array<Driver>> => {
  const basicDataDriver: AxiosResponse<any, any> = await axios.get(
    'https://www.formula1.com/en/drivers.html',
  );
  if (basicDataDriver.status === 200) {
    const $: CheerioAPI = cheerio.load(basicDataDriver.data);
    const listItemLink: Cheerio<Element> = $('.listing-item--link');
    const finalResult: Array<Driver> = [];
    for (const element of listItemLink) {
      const firstName: string = $(element)
        .find('.listing-item--name .f1--xxs')
        .text();
      const lastName: string = $(element)
        .find('.listing-item--name .f1-bold--s')
        .text();
      const rank: number = parseInt($(element).find('.rank').text());
      const points: number = parseInt(
        $(element).find('.points .f1-wide--s').text(),
      );
      const imgCountry: string = $(element)
        .find('.coutnry-flag--photo img')
        .attr('data-src');
      const imgDriver: string = $(element)
        .find('.listing-item--photo img')
        .attr('data-src');
      const imgNumber: string = $(element)
        .find('.listing-item--number img')
        .attr('data-src');
      const dataDriver: Driver = await fetchAdditionalDataDriver(
        firstName,
        lastName,
        {
          name: firstName + ' ' + lastName,
          rank,
          points,
          imgCountry,
          imgDriver,
          imgNumber,
        },
      );
      finalResult.push(dataDriver);
    }
    return finalResult;
  } else {
    console.log(
      'Failed to seed data drivers. Try again.',
      basicDataDriver.status,
    );
  }
};

const fetchAdditionalDataDriver = async (
  firstName: string,
  lastName: string,
  basicDataDriver: BasicDataDriver,
): Promise<Driver> => {
  const additionalDataDriver: AxiosResponse<any, any> = await axios.get(
    `https://www.formula1.com/en/drivers/${firstName
      .toLowerCase()
      .trim()
      .replace(' ', '-')}-${lastName
      .trim()
      .toLowerCase()
      .replace(' ', '-')}.html`,
  );
  if (additionalDataDriver.status === 200) {
    const $: CheerioAPI = cheerio.load(additionalDataDriver.data);
    const tableData: Cheerio<Element> = $('tbody tr');
    const resultBeforeFormat: any = {};
    tableData.each((index: number, element) => {
      const key: string = $(element).find('.stat-key .text').text().trim();
      const value: string = $(element).find('.stat-value').text().trim();
      resultBeforeFormat[key] = value;
    });
    const resultAfterFormat: any = {};
    Object.keys(resultBeforeFormat).forEach((key: string) => {
      const newKey: string = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
      resultAfterFormat[newKey.charAt(0).toLowerCase() + newKey.slice(1)] =
        resultBeforeFormat[key];
    });
    const textBio: string = $('.biography').find('.parbase p').text();
    resultAfterFormat['biography'] = textBio;
    return {
      ...resultAfterFormat,
      ...basicDataDriver,
    };
  } else {
    console.log(
      'Failed to seed data drivers. Try again.',
      additionalDataDriver.status,
    );
  }
};

export const drivers = async (): Promise<Array<Driver>> => {
  return await fetchDataDriver();
};
