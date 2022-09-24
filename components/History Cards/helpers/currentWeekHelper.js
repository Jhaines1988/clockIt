import {
  convertCentisecondsToEditHistoryScreenFormat,
  convertCentisecondsToHistoryScreenFormat,
} from '../../../utils/DateTimeHelpers/convertCentisecondsToHistoryScreenFormat';
import { findDay, lastSunday } from '../../../utils/DateTimeHelpers/DateTimeHelpers';
import { dayMap, monthMap } from '../../../utils/DateTimeHelpers/DateTimeMaps';

export const currentWeekFormatter = function (item) {
  const start = lastSunday();
  const today = findDay().valueOf();
  const formattedUserWeek = [];

  for (let i = 0; i < 7; i++) {
    const dateKey = start.toDateString();
    const formattedDay = dayMap[dateKey.slice(0, 3)];
    if (typeof item[dateKey] === 'number') {
      formattedUserWeek.push({
        date: formattedDay,
        time: convertCentisecondsToHistoryScreenFormat(item[dateKey]),
        totalTime: convertCentisecondsToEditHistoryScreenFormat(item[dateKey]),
        editable: true,
      });
    } else {
      const isEditable = start.valueOf() < today ? true : false;
      formattedUserWeek.push({
        date: formattedDay,
        time: '-',
        totalTime: isEditable ? { hours: 0, minutes: 0 } : { hours: '-', minutes: '-' },
        editable: isEditable,
      });
    }
    start.setDate(start.getDate() + 1);
  }

  return formattedUserWeek;
};

export const weekStartHeadingGenerator = function () {
  const weekStart = lastSunday();
  const dayOfWeek = dayMap[weekStart.toDateString().slice(0, 3)];
  const date = weekStart.getDate();
  const month = monthMap[weekStart.getMonth()];
  const year = weekStart.getFullYear();

  return `${dayOfWeek}, ${month} ${date} ${year}`;
};
convertCentisecondsToEditHistoryScreenFormat;
