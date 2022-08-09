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
let date = new Date(Date.now()).getTime();
let dateNow = Date.now('MM.D.YY');

export const getTimeActivityData = async (userId, activityName) => {
  let id = 'Z20rA8EtLKfZ7PadJ7FcQjrfyFH3';
  console.log('THISRUNS');

  // this will get the activity data for ONLY a collection of a SPECIFIC Document.
  //'Hello" in this case.
  //  userId/nameOftheactivity/durationCollection/DaysDocuments.
  // the specific  doc is Hello and the collection is activityDuration which has days docs inside it.

  const q = query(
    collection(db, id, 'Hello', 'activityDuration'),
    orderBy('dayOfWeek', 'desc'),
    limit(5)
  );

  // const querySnapShot = await getDocs(q);
  // This has the document IDS being used as a name for the homescreen activities...
  // not a best practice according to firebase.
  // const docDataSnap = await getDocs(collection(db, id));

  // This retrieves the actual documents from the collection userId/activities.
  // currently being used to populateHomeScreen.
  // const docDataSnap = await getDoc(doc(db, id, 'activities'));

  // if (docDataSnap.exists()) {
  //   console.log('docDaga', docDataSnap.data());
  // } else {
  //   console.log('No Data');
  // }
  // const activities = [];
  // docDataSnap.forEach((doc) => {
  //   // console.log(doc.id, '=>', doc.data());
  //   activities.push(doc.id);
  // });
  // console.log(activities, '__');

  const usersCollectionSnap = await getDoc(doc(db, 'users', id));

  if (usersCollectionSnap.exists()) {
    console.log('docDaga', usersCollectionSnap.data());
  } else {
    console.log('No Data');
  }

  const activities = [];
  usersCollectionSnap.forEach((doc) => {
    // console.log(doc.id, '=>', doc.data());
    activities.push(doc.id);
  });
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
      cities.push(doc.data());
    });
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        console.log('Added: ', change.doc.data());
      }
      if (change.type === 'modified') {
        console.log('Modified : ', change.doc.data());
      }
      if (change.type === 'removed') {
        console.log('Removed city: ', change.doc.data());
      }
    });
    console.log('Current cities in CA: ', cities);
  });

  unsubscribe();
  // querySnapShot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, ' => ', doc.data());
  //   console.log(doc.id, ' => ', new Date(doc.id).toDateString());
  // });
  // const querySnapshot = await getDocs(collection(db, id, 'Hello', 'activityDuration'));
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, ' => ', doc.data());
  // });
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

export const getUsersCurrentWeekData = async (userId) => {
  try {
    let usersCurrentWeekData = await getDoc(doc(db, userId, 'Week Data'));
    if (usersCurrentWeekData.exists()) {
      return usersCurrentWeekData.data();
    } else {
      return false;
    }
  } catch (error) {
    console.log('ERROR IN GET USERS CURRENT WEEK DATA', error);
  }
};

export const compareTimeStamp = (currentTime, expiryTime) => {
  return currentTime >= expiryTime;
};
