export const getDates = function () {
  const today = new Date();
  const tomorrow = new Date(today);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  // lastWeek.setHours(0, 0, 0, 0);

  return [lastWeek.valueOf(), tomorrow.valueOf()];
};
