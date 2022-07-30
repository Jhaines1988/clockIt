export const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
};
export const convertCentiSecondsToHMS = (centiseconds) => {
  let seconds = (centiseconds / 100) | 0;
  let minutes = (seconds / 60) | 0;
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  let isRoundedUp = seconds >= 45 ? true : false;
  minutes = isRoundedUp ? minutes + 1 : minutes;
  seconds = isRoundedUp ? 0 : seconds;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};
