import { arrayUnion, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { findDay, getStartAndEndOfWeek } from '../utils/DateTimeHelpers/getDay';

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
  const dayOfWeek = findDay().getDay();
  try {
    const docData = createActivityData(activity);
    const postData = await updateDoc(
      doc(db, userId, 'activities'),

      { weeklyActivities: arrayUnion(docData) }
    );

    return docData;
  } catch (error) {
    console.log('Error adding activity', error);
  }
};

export const addToHistory = async (id, dataFromLastWeek) => {
  const year = new Date().getFullYear().toString();

  const docData = {};

  dataFromLastWeek.weeklyActivities.forEach((activity) => {
    const name = activity.name;
    docData[name] = { ...activity };
  });

  docData.startedAt = dataFromLastWeek.startedAt;
  docData.expiredAt = dataFromLastWeek.expiresAt;
  try {
    const startOfWeek = dataFromLastWeek.startedAt.toDate();
    startOfWeek.setHours(0, 0, 0, 0);

    await setDoc(doc(db, id, 'History', year, startOfWeek.toISOString()), docData);
  } catch (error) {
    console.log(error);
    throw new Error({ message: error.message });
  }
};

// creates a new week in the document 'currentWeek' when the current week has expired

export const instantiateNewActivitiesDocument = async (id, activities = []) => {
  const [startOfWeek, endOfWeek] = getStartAndEndOfWeek();
  startOfWeek.setHours(0, 0, 0, 0);
  let weekData = {
    weekOf: startOfWeek.toLocaleDateString(),
    expiresAt: Timestamp.fromDate(endOfWeek),
    startedAt: startOfWeek,
    weeklyActivities: activities,
  };

  try {
    await setDoc(doc(db, id, 'activities'), weekData);
  } catch (error) {
    console.log('Error Instantiating new Activities document', error);
    throw new Error({ message: error.message });
  }
};

/* Methods for adding data from stop watch */

export const onStopWatchFinish = async (userId, currentActivities) => {
  try {
    await updateUserActivities(userId, currentActivities);
  } catch (error) {
    console.log('Error in "On Stop Watch Finish ":', error.message);
  }
};
export const updateUserActivities = async (id, updatedActivities) => {
  try {
    await updateDoc(doc(db, id, 'activities'), {
      weeklyActivities: updatedActivities,
    });
  } catch (error) {
    console.log('Error Updating user Activities:', error);
    throw new Error(error);
  }
};
