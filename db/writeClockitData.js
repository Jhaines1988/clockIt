import { arrayUnion, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { findDay } from '../utils/DateTimeHelpers/getDay';

import { getStartAndEndOfWeek } from '../utils/DateTimeHelpers/DateTimeHelpers';

/* ADD ACTIVITY DATA TO HOME SCREEN  */

// utitlity function that  creates a data object //
function createActivityData(activityName) {
  const activity = {
    name: activityName,
    id: Date.now(),
    totalTime: 0,
  };
  return activity;
}

// adding Activities to the home screen
export const addActivityToUserHomeScreen = async (activity, userId) => {
  try {
    const docData = createActivityData(activity);
    const postData = await updateDoc(
      doc(db, userId, 'activities'),

      { activities: arrayUnion(docData) }
    );

    await updateActivityTimeOnFinish(userId, docData);
    return docData;
  } catch (error) {
    console.log('Error adding activity', error);
  }
};

// updates the user activities in the db after time is added to an activity, the activity is renamed.

export const updateUserActivities = async (id, updatedActivities) => {
  try {
    await updateDoc(doc(db, id, 'activities'), {
      activities: updatedActivities,
    });
  } catch (error) {
    console.log('Error Updating user Activities:', error);
    throw new Error(error);
  }
};

export const updateNamesInUsersCurrentWeek = async (userId, oldName, newName) => {
  try {
    const currentWeekRef = await getDoc(doc(db, userId, 'currentWeek'));

    let newObj = {};
    if (currentWeekRef.exists()) {
      for (let key in currentWeekRef.data()) {
        if (key === oldName) {
          newObj[newName] = currentWeekRef.data()[oldName];
        } else {
          newObj[key] = currentWeekRef.data()[key];
        }
      }
    }

    await setDoc(doc(db, userId, 'currentWeek'), newObj);
  } catch (error) {
    console.log('error updating namesinCurrentWeek', error);
  }
};

/*   Methods for instantiating a new piece of "currentWeek" data for the user when the current week has expired.  */

export const addToHistory = async (id) => {
  const year = new Date().getFullYear().toString();
  try {
    const lastWeekRef = await getDoc(doc(db, id, 'currentWeek'));

    let previousWeeksData;
    if (lastWeekRef.exists()) {
      previousWeeksData = lastWeekRef.data();
    }
    await setDoc(
      doc(db, id, 'History', year, previousWeeksData.startedAt.toDate().toISOString()),
      previousWeeksData
    );
  } catch (error) {
    console.log(error);
    throw new Error({ message: error.message });
  }
};

// creates a new week in the document 'currentWeek' when the current week has expired
export const instantiateNewWeek = async (id) => {
  const [startOfWeek, endOfWeek] = getStartAndEndOfWeek();
  try {
    await setDoc(doc(db, id, 'currentWeek'), { expiresAt: endOfWeek, startedAt: startOfWeek });
  } catch (error) {
    console.log('Error Instantiating New Week', error);
  }
};

export const instantiateNewActivitiesDocument = async (id, activities = []) => {
  const [startOfWeek, endOfWeek] = getStartAndEndOfWeek();
  let weekData = {
    weekOf: startOfWeek.toLocaleDateString(),
    expiresAt: Timestamp.fromDate(endOfWeek),
    activities,
  };

  try {
    await setDoc(doc(db, id, 'activities'), weekData);
  } catch (error) {
    console.log('Error Instantiating new Activities document', error);
    throw new Error({ message: error.message });
  }
};

/* Methods for adding data from stop watch */

export const updateActivityTimeOnFinish = async (userId, updatedActivity) => {
  try {
    const dayOfWeek = findDay().getDay();
    const name = updatedActivity.name;
    const docData = {
      id: updatedActivity.id,
      totalTime: updatedActivity.totalTime,
    };
    await setDoc(
      doc(db, userId, 'currentWeek'),

      { [name]: { [dayOfWeek]: docData } },
      { merge: true }
    );
  } catch (error) {
    console.log('Error in updateActivityTimeOnFinish:', error);
  }
};
export const onStopWatchFinish = async (userId, activityObject, currentActivities) => {
  // activityObject.totalTime += timeFromStopWatch;

  try {
    await updateActivityTimeOnFinish(userId, activityObject);
    await updateUserActivities(userId, currentActivities);
  } catch (error) {
    console.log('Error in "On Stop Watch Finish ":', error.message);
  }
};
