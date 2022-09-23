import { findDay, lastSunday } from '../../../utils/DateTimeHelpers/DateTimeHelpers';
import { dayMap } from '../../../utils/DateTimeHelpers/DateTimeMaps';

export const currentWeekFormatter = function (item) {
  const start = lastSunday();
  const today = findDay().valueOf();
  const formattedUserWeek = [];

  for (let i = 0; i < 7; i++) {
    const dateKey = start.toDateString();
    const formattedDay = dayMap[dateKey.slice(0, 3)];
    if (typeof item[dateKey] === 'number') {
      formattedUserWeek.push({ date: formattedDay, time: item[dateKey], editable: true });
    } else {
      formattedUserWeek.push({
        date: formattedDay,
        time: '-',
        editable: start.valueOf() < today ? true : false,
      });
    }
    start.setDate(start.getDate() + 1);
  }

  return formattedUserWeek;
};
