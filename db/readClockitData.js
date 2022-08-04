import { db } from '../firebase';
import { collection, getDocs, getDoc, doc, Timestamp } from 'firebase/firestore';

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
