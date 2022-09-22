export const weekSoFar = function (item) {
  const week = Object.keys(item).reduce((acc, key) => {
    if (key !== 'id' && key !== 'name' && key !== 'totalTime') {
      acc.push({ date: key, time: item[key] });
    }
    return acc;
  }, []);
  return week;
};
