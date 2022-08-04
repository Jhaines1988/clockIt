import { db } from '../firebase';

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
export const addActivityData = async (activity, duration, userId) => {
  console.log(userId);
  const docData = {
    activity,
    id: Math.random().toString(),
  };
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
