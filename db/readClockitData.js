import { db } from '../firebase';
import {
  getDoc,
  getDocs,
  collection,
  doc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

import { addToHistory, resetCurrentWeek, updateUserActivities } from './writeClockitData';
import {
  findTheNextSunday,
  findDay,
  previousSunday,
  createWeekData,
} from '../utils/DateTimeHelpers/getDay';
import { Timestamp } from 'firebase/firestore';

export const getActivityData = async () => {
  //   try {
  //     const docRef = doc(db, 'test', 'user1');
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log('Document data:', docSnap.data());
  //     }
  //   } catch (error) {
  //     console.log('No such document!', error);
  //   }
};
export const getUserDataOnMount = async (userId) => {
  try {
    const userActivitiesRef = doc(db, userId, 'activities');
    const userActivitiesSnap = await getDoc(userActivitiesRef);
    if (userActivitiesSnap.exists()) {
      const fetchedUserActivities = userActivitiesSnap.data().userActivities;
      return fetchedUserActivities;
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.log('ERROR GETTING USER DATA ON MOUNT', error);
    throw new Error(error);
  }
};

export const updateListener = async (userId, cb) => {
  let updatedActivities;
  return onSnapshot(doc(db, userId, 'activities'), (doc) => {
    console.log('!');
    cb(doc.data().activities);
  });
};

export const resetUserWeek = async (userId, previousUserData) => {
  try {
    let previousWeek = previousUserData;
    let nextSunday = findTheNextSunday(findDay());
    let lastSunday = previousSunday(nextSunday);
    let weekData = createWeekData(nextSunday);

    await addToHistory(userId, lastSunday, previousWeek);
    await resetCurrentWeek(userId, weekData);

    const activitiesSnap = await getUserActivities(userId);
    const updatedActivities = resetUserActivityTimeForNewWeek(activitiesSnap.activities);
    await updateUserActivities(userId, updatedActivities);
  } catch (error) {
    console.log('error', error);
  }
};

export const validateWeekIsInRange = async (userId) => {
  try {
    let usersCurrentWeekData = await getUsersCurrentWeekData(userId);
    if (!usersCurrentWeekData) {
      throw new Error('There is no current Week associated with this user...');
    }

    const today = Timestamp.now().valueOf();
    const expiration = usersCurrentWeekData.expiresAt.valueOf();
    const isNewWeek = compareTimeStamp(today, expiration);

    if (isNewWeek) {
      resetUserWeek(userId, usersCurrentWeekData);
    }
  } catch (error) {
    console.log('error In Validate week', error);
  }
};

export const getUserActivities = async (userId) => {
  console.log('userID', userId);
  try {
    const activitiesSnap = await getDoc(doc(db, userId, 'activities'));
    let userActivities;
    if (activitiesSnap.exists()) {
      userActivities = activitiesSnap.data();
      return userActivities;
    } else {
      return [];
    }
  } catch (error) {
    console.log('error in getUSerActivities', error);
    throw new Error({ message: error.message });
  }
};

export const resetUserActivityTimeForNewWeek = (userActivities) => {
  for (const activity of userActivities) {
    activity.totalTime = 0;
  }
  return userActivities;
};

export const getUsersExpiration = async (userId) => {
  try {
    let usersCurrentWeekData = await getDoc(doc(db, userId, 'currentWeek'));
    if (usersCurrentWeekData.exists()) {
      if (compareTimeStamp(usersCurrentWeekData.data().expiresAt)) {
        // handle it
      } else {
        return usersCurrentWeekData.data().startedAt.toDate().toLocaleDateString();
      }
    } else {
    }
  } catch (error) {
    console.log('ERROR IN GET USERS CURRENT WEEK DATA', error);
  }
};

export const compareTimeStamp = (expiryDate) => {
  let today = Timestamp.fromDate(findDay()).valueOf();

  return today >= expiryDate;
};
