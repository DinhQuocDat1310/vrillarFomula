import * as moment from 'moment';

export const checkTimeToSort = (a: any, b: any) => {
  if (a.month.length === 7 && b.month.length !== 7) {
    const monthA = moment(a.month.slice(4), 'MMM').month();
    const monthB = moment(b.month, 'MMM').month();
    return monthA - monthB;
  }
  if (a.month.length !== 7 && b.month.length === 7) {
    const monthB = moment(b.month, 'MMM').month();
    const monthA = moment(a.month.slice(4), 'MMM').month();
    return monthA - monthB;
  }
  if (a.month.length !== 7 && b.month.length !== 7) {
    const monthA = moment(a.month, 'MMM').month();
    const monthB = moment(b.month, 'MMM').month();
    return monthA - monthB;
  }
};
