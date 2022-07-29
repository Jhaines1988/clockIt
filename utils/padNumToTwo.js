const padNumToTwo = (num) => (num <= 9 ? `0${num}` : num);

const displayTime = (hundredthsOfSecond) => {
  let min = 0;
  let sec = 0;
  if (hundredthsOfSecond < 0) {
    sec = 0;
  }

  if (hundredthsOfSecond < 100) {
    return `00:00:${padNumToTwo(hundredthsOfSecond)}`;
  }
  let remainingHundredthsOfSecond = hundredthsOfSecond % 100;
  sec = (hundredthsOfSecond - remainingHundredthsOfSecond) / 100;

  if (sec < 60) {
    return `00:${padNumToTwo(sec)}:${padNumToTwo(remainingHundredthsOfSecond)}`;
  }
  let remainingSeconds = sec % 60;
  min = (sec - remainingSeconds) / 60;
  return `${padNumToTwo(min)}:${padNumToTwo(remainingSeconds)}:${padNumToTwo(
    remainingHundredthsOfSecond
  )}`;
};

const displayHundreds = (hundredthsOfSecond) => {
  return padNumToTwo(hundredthsOfSecond);
};

const displaySeconds = (seconds) => {
  if (seconds < 60) {
    return padNumToTwo(seconds);
  }
};

const displayMinutes = (minutes) => {
  if (minutes <= 60) {
    return padNumToTwo(minutes);
  }
};
export default displayTime;

/*

display hundreds


Display seconds
Display minutes;

display hours.


*/
