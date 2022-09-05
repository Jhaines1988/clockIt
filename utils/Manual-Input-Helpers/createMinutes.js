export const createMinutes = function () {
  const minutes = [];
  for (let i = 0; i < 60; i++) {
    minutes.push(i);
  }

  return [{ title: 'Minutes', data: minutes }];
};

export const createHours = function () {
  const hours = [];

  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  return [{ title: 'Hours', data: hours }];
};
