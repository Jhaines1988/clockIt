import { db } from '../firebase';
import {
  addDoc,
  setDoc,
  doc,
  collection,
  Timestamp,
  getDoc,
} from 'firebase/firestore';

// Firestore data converter
// find how to convert time into readable shizz.

export const addActivityData = async (activity, duration) => {
  const docData = {
    activity: 'Air-Bike',
    time: Timestamp.fromDate(new Date()),
  };
  await setDoc(doc(db, 'test', 'user1'), docData);
};
