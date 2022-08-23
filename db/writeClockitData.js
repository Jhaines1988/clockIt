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
export const addActivityData = async (activity, userId) => {
  const docData = createActivityData(activity);
  try {
    const postData = await setDoc(doc(db, userId, 'activities'), docData);
  } catch (error) {
    console.log(error);
  }
};

export const addActivityToUserHomeScreen = async (activity, userId) => {
  try {
    const docData = createActivityData(activity);
    const postData = await updateDoc(
      doc(db, userId, 'activities'),

      { activities: arrayUnion(docData) }
    );
    return docData;
  } catch (error) {
    console.log('Error adding activity', error);
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

export const renameActivity = async (id, activities, activityObj) => {};
/* Methods for adding data from stop watch */

export const updateActivityTimeOnFinish = async (userId, updatedActivity) => {
  try {
    const dayOfWeek = findDay().getDay();
    const name = updatedActivity.name;
    await setDoc(
      doc(db, userId, 'currentWeek'),

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
  activityObject.totalTime += timeFromStopWatch;

  try {
    await updateActivityTimeOnFinish(userId, activityObject);
    await updateUserActivities(userId, currentActivities);
    return currentActivities;
  } catch (error) {
    console.log('Error in "onStopWatchFinish":', error);
  }
};
