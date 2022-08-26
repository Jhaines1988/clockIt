import { collection, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { findDay } from '../utils/DateTimeHelpers/getDay';

export const resetUserActivityTimeForNewWeek = (userActivities) => {
  for (const activity of userActivities) {
    activity.totalTime = 0;
  }
  return userActivities;
};

export const compareTimeStamp = (expiryDate) => {
  let today = Timestamp.fromDate(findDay()).valueOf();

  return today >= expiryDate;
};

export const readHistory = async (userId) => {
  const year = new Date().getFullYear().toString();
  const historyRef = collection(db, userId, 'History', year);
  const historySnap = await getDocs(historyRef, orderBy('startedAt'));

  historySnap.forEach((doc) => {
    const time = doc.data().startedAt;
    console.log(time.toDate());
    console.log(doc.data(), 'in write');
  });
};
