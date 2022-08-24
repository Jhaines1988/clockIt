export const findDay = () => {
  let todaysDate = new Date();
  let offSet = todaysDate.getTimezoneOffset();
  todaysDate.setMinutes(todaysDate.getUTCMinutes() - offSet, 0, 0, 0);
  //   todaysDate.setUTCHours(offSet);
  return todaysDate;
};

export const getStartOfWeek = () => {
  let today = findDay();
  today.setDate(today.getDate() - today.getDay());
  return today.toLocaleDateString();
};
