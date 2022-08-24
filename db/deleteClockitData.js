import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const deleteItemFromActivitiesList = async (userId, items, itemIdToRemove) => {
  let listWithActivityRemoved = items.filter((item) => item.id !== itemIdToRemove);
  try {
    const postData = await setDoc(
      doc(db, userId, 'activities'),
      {
        activities: listWithActivityRemoved,
      },
      { merge: true }
    );
    return listWithActivityRemoved;
  } catch (error) {
    console.log('ERROR DELETING DATA: HANDLE ERRORS FROM HERE', error);
  }
};
