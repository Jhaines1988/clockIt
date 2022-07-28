import { db } from '../firebase';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

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

let date = new Date(Date.now()).getTime();
let dateNow = Date.now('MM.D.YY');
