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
  console.log(currentDayOfWeek, currentDate);
  let daysRemaining = 7 - currentDayOfWeek;
  console.log('days', daysRemaining);
  let nextSunday = new Date(date);
  nextSunday.setDate(currentDate + daysRemaining);
  nextSunday.setHours(0, 0, 0, 0);
  return nextSunday;
};

export const previousSunday = (date) => {
  let lastSunday = new Date(date);
  lastSunday.setDate(lastSunday.getDate() - 7);
  let firstWeekLabel = lastSunday.toISOString();
  return firstWeekLabel;
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
  let startOfWeek = previousSunday(endOfWeek);
  return [startOfWeek, endOfWeek];
};
