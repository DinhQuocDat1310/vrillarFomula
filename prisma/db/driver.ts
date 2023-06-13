import { BASE_ROUTE } from './../../src/constant/baseRoute';
import { Prisma } from '@prisma/client';
import axios from 'axios';
import cheerio, { Cheerio, CheerioAPI, Element } from 'cheerio';

const fetchDataDriver = async () => {
  const basicDataDriver = await axios.get(
    'https://www.formula1.com/en/drivers.html',
  );
  if (basicDataDriver.status === 200) {
    const $: CheerioAPI = cheerio.load(basicDataDriver.data);
    const listItemLink: Cheerio<Element> = $('.listing-item--link');
    const finalResult: Array<Prisma.DriverCreateInput> = [];
    for (const element of listItemLink) {
      const firstName: string = $(element)
        .find('.listing-item--name .f1--xxs')
        .text();
      const lastName: string = $(element)
        .find('.listing-item--name .f1-bold--s')
        .text();
      const rank: Number = Number($(element).find('.rank').text());
      const points: Number = Number(
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
      const dataDriver = await fetchAdditionalDataDriver(firstName, lastName, {
        name: firstName + ' ' + lastName,
        rank,
        points,
        imgCountry,
        imgDriver,
        imgNumber,
      });
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
  basicDataDriver: Object,
) => {
  const additionalDataDriver = await axios.get(
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
    tableData.each((index, element) => {
      const key = $(element).find('.stat-key .text').text().trim();
      const value = $(element).find('.stat-value').text().trim();
      resultBeforeFormat[key] = value;
    });

    const resultAfterFormat: any = {};
    Object.keys(resultBeforeFormat).forEach((key) => {
      const newKey = key
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

export const drivers = async () => {
  return await fetchDataDriver();
};
