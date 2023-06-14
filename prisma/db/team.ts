import axios from 'axios';
import cheerio, { Cheerio, CheerioAPI, Element } from 'cheerio';

const fetchDataTeam = async () => {
  const basicDataTeam = await axios.get(
    'https://www.formula1.com/en/teams.html',
  );
  if (basicDataTeam.status === 200) {
    const $: CheerioAPI = cheerio.load(basicDataTeam.data);
    const listTeamLink: Cheerio<Element> = $('.listing-item-wrapper');
    // const finalResult: Array<Prisma.TeamCreateInput> = [];
    const finalResult: any = [];
    for (const element of listTeamLink) {
      const rank: Number = Number(
        $(element).find('.listing-standing .rank').text(),
      );
      const points: Number = Number(
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
      const dataTeam = await fetchAdditionalDataTeam(name.replace(/ /g, '-'), {
        name,
        rank,
        points,
        imgLogo,
        imgTeamCar,
      });
      finalResult.push(dataTeam);
    }
    return finalResult;
  } else {
    console.log('Failed to seed data team. Try again.', basicDataTeam.status);
  }
};

const fetchAdditionalDataTeam = async (
  name: string,
  additionalData: Object,
) => {
  const additionalDataTeam = await axios.get(
    `https://www.formula1.com/en/teams/${name}.html`,
  );
  if (additionalDataTeam.status === 200) {
    const $: CheerioAPI = cheerio.load(additionalDataTeam.data);
    const imgBrandLogo = $('.brand-logo img').attr('src');
    const intro = $('.information .text p').text();
    const tableData: Cheerio<Element> = $('tbody tr');
    const resultBeforeFormat: any = {};
    const dataProfile = [];
    tableData.each((index, element) => {
      const key: string = $(element).find('.stat-key .text').text().trim();
      const value: string = $(element).find('.stat-value').text().trim();
      resultBeforeFormat[key] = value;
    });
    $('.information')
      .find('h4, p')
      .each((index, element) => {
        const year = Number($(element).text().trim());
        const descriptionOfYear = $(element).next().text().trim();

        if (year && descriptionOfYear) {
          dataProfile.push({ year, descriptionOfYear });
        }
      });
    const teamProfile = dataProfile.filter(
      (data) => typeof data.year === 'number',
    );

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

export const teams = async () => {
  return await fetchDataTeam();
};
