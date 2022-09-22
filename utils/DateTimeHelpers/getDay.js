import { Timestamp } from 'firebase/firestore';

export const findDay = () => {
  let todaysDate = new Date();
  let offSet = todaysDate.getTimezoneOffset();
  todaysDate.setMinutes(todaysDate.getUTCMinutes() - offSet, 0, 0, 0);
  //   todaysDate.setUTCHours(offSet);
  return todaysDate;
};

export const findTheNextSunday = (date) => {
  let currentDayOfWeek = date.getDay();
  let currentDate = date.getDate();

  let daysRemaining = 7 - currentDayOfWeek;
  console.log('days', daysRemaining);
  let nextSunday = new Date(date);
  nextSunday.setDate(currentDate + daysRemaining);
  nextSunday.setHours(0, 0, 0, 0);
  return nextSunday;
};

export const getLastSunday = (upcomingSunday) => {
  let lastSunday = new Date(upcomingSunday);
  lastSunday.setDate(lastSunday.getDate() - 7);
  return lastSunday;
};

export const createWeekData = (expiryDate) => {
  let weekData = {
    expiresAt: Timestamp.fromDate(expiryDate),
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
  };
  return weekData;
};

export const getNextExpiryDate = () => {
  let today = findDay();
  let nextSunday = findTheNextSunday(today);
  const expiryDate = Timestamp.fromDate(nextSunday);
  return expiryDate.toDate();
};

export const getStartAndEndOfWeek = () => {
  let endOfWeek = getNextExpiryDate();
  let startOfWeek = getLastSunday(endOfWeek);
  return [startOfWeek, endOfWeek];
};

export const compareTimeStamp = (expiryDate) => {
  let today = Timestamp.fromDate(findDay()).valueOf();

  return today >= expiryDate;
};
