export const weekSoFar = function (item) {
  const week = Object.keys(item).reduce((acc, key) => {
    if (key !== 'id' && key !== 'name' && key !== 'totalTime') {
      acc.push({ date: key, time: item[key] });
    }
    return acc;
  }, []);
  return week;
};

const dateOrderHelper = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};
