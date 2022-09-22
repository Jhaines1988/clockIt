import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
export const findDay = () => {
  let todaysDate = new Date();
  let offSet = todaysDate.getTimezoneOffset();
  todaysDate.setMinutes(todaysDate.getUTCMinutes() - offSet, 0, 0, 0);

  return todaysDate;
};

export const getStartOfWeek = () => {
  let today = findDay();
  today.setDate(today.getDate() - today.getDay());
  return today.toLocaleDateString();
};

export const compareTimeStamp = (expiryDate) => {
  let today = Timestamp.fromDate(findDay()).valueOf();

  return today >= expiryDate;
};
export const formatDateForDB = () => {
  let weekStart = getStartOfWeek();
  weekStart = weekStart.split('/').join('');
  return weekStart;
};

export const getStartAndEndOfWeek = () => {
  let endOfWeek = getNextExpiryDate();
  let startOfWeek = getLastSunday(endOfWeek);
  return [startOfWeek, endOfWeek];
};
export const getNextExpiryDate = () => {
  let today = findDay();
  let nextSunday = findTheNextSunday(today);
  const expiryDate = Timestamp.fromDate(nextSunday);
  return expiryDate.toDate();
};
export const getLastSunday = (upcomingSunday) => {
  let lastSunday = new Date(upcomingSunday);
  lastSunday.setDate(lastSunday.getDate() - 7);
  return lastSunday;
};
export const findTheNextSunday = (date) => {
  let currentDayOfWeek = date.getDay();
  let currentDate = date.getDate();

  let daysRemaining = 7 - currentDayOfWeek;

  let nextSunday = new Date(date);
  nextSunday.setDate(currentDate + daysRemaining);
  nextSunday.setHours(0, 0, 0, 0);
  return nextSunday;
};

export const generateWeekForFlatList = (day, dateCreated, range = 6) => {
  const validDates = [];

  day.setHours(0, 0, 0, 0);

  for (let i = range; i >= 0; i--) {
    validDates.push({
      label: day.toDateString(),
      value: day.toDateString(),
      id: day.valueOf().toString(),
    });

    if (day.valueOf() <= lastSunday().valueOf()) {
      break;
    }
    day.setDate(day.getDate() - 1);
  }

  return validDates;
};

export const lastSunday = () => {
  const lastSunday = findDay();
  lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
  lastSunday.setHours(0, 0, 0, 0);
  return lastSunday;
};

export const compareDatesForManualEntry = (dateFromUserInput) => {
  const lastSunday = findDay();
  lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
  lastSunday.setHours(0, 0, 0, 0);
  dateFromUserInput.setDate(dateFromUserInput.getDate() - dateFromUserInput.getDay());

  return dateFromUserInput.toISOString() === lastSunday.toISOString();
};
