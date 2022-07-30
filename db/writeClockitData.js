import { db } from '../firebase';
import { addDoc, setDoc, doc, collection, Timestamp, getDoc } from 'firebase/firestore';
import { convertCentiSecondsToHMS, padTo2Digits } from '../utils/convertCentisecondstoHMS';
export const addActivityData = async (activity, duration) => {
  const docData = {
    activity: 'Air-Bike',
    time: Timestamp.fromDate(new Date()),
  };
};
