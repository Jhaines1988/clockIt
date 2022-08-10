import { db } from '../firebase';
import { findDay } from '../utils/DateTimeHelpers/getDay';
import {
  addDoc,
  setDoc,
  updateDoc,
  doc,
  getDocs,
  collection,
  Timestamp,
  getDoc,
  arrayUnion,
} from 'firebase/firestore';
import { convertCentiSecondsToHMS, padTo2Digits } from '../utils/convertCentisecondstoHMS';

/* ADD ACTIVITY DATA TO HOME SCREEN  */

function createActivityData(activityName) {
  const activity = {
    name: activityName,
    id: Date.now(),
    totalTime: 0,
  };
  return activity;
}
export const addActivityData = async (activity, duration, userId) => {
  const docData = createActivityData(activity);
  try {
    const postData = await setDoc(doc(db, userId, 'activities'), docData);
  } catch (error) {
    console.log(error);
  }
};

export const addActivityToUserHomeScreen = async (activity, userId) => {
  try {
    const docData = {
      activity,
      id: Math.random().toString(),
    };
    const postData = await updateDoc(
      doc(db, userId, 'activities'),

      { userActivities: arrayUnion(docData) }
    );
    console.log(postData, 'heres the data... ');
    return docData;
  } catch (error) {
    console.log('Error adding activity', error);
  }
};

export const addTimeDataToUserActivities = async (activity, duration, userId) => {
  const querySnapshot = await getDocs(collection(db, userId));

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });
  const docData = {
    activity: activity,
    timeToday: duration,
    timeThisWeek: 0,
  };

  try {
    const postData = await setDoc(
      doc(db, userId, 'activities', activity, '07.31.22-08.06.22'),
      docData
    );
  } catch (error) {
    console.log('ERRORWRITINGDATA', error);
  }
};
/*   Methods for instantiating a new piece of "WEEK" data for the user when the current week has expired.  */

export const addToHistory = async (id, firstWeekLabel, previousWeekData) => {
  try {
    await setDoc(doc(db, id, 'Previous Weeks', 'history', firstWeekLabel), previousWeekData);
  } catch (error) {
    throw new Error({ message: error.message });
  }
};
export const resetCurrentWeek = async (id, weekData) => {
  try {
    await setDoc(doc(db, id, 'Week Data'), weekData);
  } catch (error) {
    throw new Error({ message: error.message });
  }
};

export const updateUserActivities = async (id, updatedActivities) => {
  try {
    await updateDoc(doc(db, id, 'activities'), {
      activities: updatedActivities,
    });
  } catch (error) {
    throw new Error({ message: error.message });
  }
};

/* Methods for adding data from stop watch */

export const updateActivityTimeOnFinish = async (userId, updatedActivity) => {
  try {
    const dayOfWeek = findDay().getDate();
    const name = updatedActivity.name;
    await setDoc(
      doc(db, userId, 'Week Data'),

      { [dayOfWeek]: { [name]: updatedActivity } },
      { merge: true }
    );
  } catch (error) {
    console.log('Error in updateActivityTimeOnFinish:', error);
  }
};
export const onStopWatchFinish = async (
  userId,
  timeFromStopWatch,
  activityObject,
  currentActivities
) => {
  const indexOfActivityToUpdate = currentActivities.indexOf(activityObject);
  currentActivities[indexOfActivityToUpdate].totalTime += timeFromStopWatch;

  try {
    await updateActivityTimeOnFinish(userId, activityObject);
    await updateUserActivities(userId, currentActivities);
    return currentActivities;
  } catch (error) {
    console.log('Error in "onStopWatchFinish":', error);
  }
};
