export const convertCentisecondsToHistoryScreenFormat = (centiseconds) => {
  let seconds = (centiseconds / 100) | 0;
  let minutes = (seconds / 60) | 0;
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  let isRoundedUp = seconds >= 30 ? true : false;
  minutes = isRoundedUp ? minutes + 1 : minutes;
  seconds = isRoundedUp ? 0 : seconds;
  minutes = minutes % 60;

  return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
};

export const convertCentisecondsToEditHistoryScreenFormat = (centiseconds) => {
  let seconds = (centiseconds / 100) | 0;
  let minutes = (seconds / 60) | 0;
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  let isRoundedUp = seconds >= 30 ? true : false;
  minutes = isRoundedUp ? minutes + 1 : minutes;
  seconds = isRoundedUp ? 0 : seconds;
  minutes = minutes % 60;

  return { hours, minutes };
};
