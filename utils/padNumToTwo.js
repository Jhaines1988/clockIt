const padNumToTwo = (num) => (num <= 9 ? `0${num}` : num);

const displayTime = (hundredthsOfSecond) => {
  let min = 0;
  let sec = 0;
  // let hours = Math.floor(minutes / 60);
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
  if (min < 60) {
    return `${padNumToTwo(min)}:${padNumToTwo(remainingSeconds)}:${padNumToTwo(
      remainingHundredthsOfSecond
    )}`;
  }
  let hours = Math.floor(min / 60);

  min = min % 60;

  // if (hours >= 1) {
  //   return `${padNumToTwo(hours)}:${padNumToTwo(min)}:${padNumToTwo(remainingSeconds)}`;
  // }

  return `${padNumToTwo(hours)}:${padNumToTwo(min)}:${padNumToTwo(remainingSeconds)}:${padNumToTwo(
    remainingHundredthsOfSecond
  )}`;
};

export default displayTime;
