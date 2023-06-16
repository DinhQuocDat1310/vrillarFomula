import { TeamProfile } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import cheerio, { Cheerio, CheerioAPI, Element } from 'cheerio';
import {
  BasicDataTeam,
  DataTeamFormat,
  ProfileTeam,
  Team,
} from 'src/team/entities/team.entity';

const fetchDataTeam = async (): Promise<Array<Team>> => {
  const basicDataTeam: AxiosResponse<any, any> = await axios.get(
    'https://www.formula1.com/en/teams.html',
  );
  if (basicDataTeam.status === 200) {
    const $: CheerioAPI = cheerio.load(basicDataTeam.data);
    const listTeamLink: Cheerio<Element> = $('.listing-item-wrapper');
    const finalResult: Array<Team> = [];
    for (const element of listTeamLink) {
      const rank: number = parseInt(
        $(element).find('.listing-standing .rank').text(),
      );
      const points: number = parseInt(
        $(element).find('.listing-standing .points .f1-wide--s').text(),
      );
      const name: string = $(element)
        .find('.listing-info .name .f1-color--black')
        .text();
      const imgLogo: string = $(element)
        .find('.logo .team-car img')
        .attr('data-src');
      const imgTeamCar: string = $(element)
        .find('.listing-image .team-car img')
        .attr('data-src');
      const dataTeam: Team = await fetchAdditionalDataTeam(
        name.replace(/ /g, '-'),
        {
          name,
          rank,
          points,
          imgLogo,
          imgTeamCar,
        },
      );
      finalResult.push(dataTeam);
    }
    return finalResult;
  } else {
    console.log('Failed to seed data team. Try again.', basicDataTeam.status);
  }
};

const fetchAdditionalDataTeam = async (
  name: string,
  additionalData: BasicDataTeam,
): Promise<Team> => {
  const additionalDataTeam: AxiosResponse<any, any> = await axios.get(
    `https://www.formula1.com/en/teams/${name}.html`,
  );
  if (additionalDataTeam.status === 200) {
    const $: CheerioAPI = cheerio.load(additionalDataTeam.data);
    const imgBrandLogo: string = $('.brand-logo img').attr('src');
    const intro: string = $('.information .text p').text();
    const tableData: Cheerio<Element> = $('tbody tr');
    const resultBeforeFormat: any = {};
    const dataProfile: Array<ProfileTeam> = [];
    tableData.each((index: number, element) => {
      const key: string = $(element).find('.stat-key .text').text().trim();
      const value: string = $(element).find('.stat-value').text().trim();
      resultBeforeFormat[key] = value;
    });
    $('.information')
      .find('h4, p')
      .each((index: number, element) => {
        const year: number = parseInt($(element).text().trim());
        const descriptionOfYear: string = $(element).next().text().trim();

        if (year && descriptionOfYear) {
          dataProfile.push({ year, descriptionOfYear });
        }
      });
    const teamProfile: ProfileTeam[] = dataProfile.filter(
      (data: TeamProfile) => typeof data.year === 'number',
    );

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
    resultAfterFormat['imgBrandLogo'] = imgBrandLogo;
    resultAfterFormat['intro'] = intro;
    resultAfterFormat['teamProfile'] = teamProfile;
    return {
      ...resultAfterFormat,
      ...additionalData,
    };
  } else {
    console.log(
      'Failed to seed data team. Try again.',
      additionalDataTeam.status,
    );
  }
};

export const teams = async (): Promise<Array<Team>> => {
  return await fetchDataTeam();
};
