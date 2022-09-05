export const manualTimeEntryConverter = function ({ hours, minutes }) {
  if (!hours && !minutes) {
    throw new Error(' Please enter an amount of time greater than zero');
  }
  const hourstoMinutes = hours * 60;
  const totalMinutes = hourstoMinutes + minutes;
  const totalSeconds = totalMinutes * 60;
  const totalCentiseconds = totalSeconds * 100;
  return totalCentiseconds;
};
