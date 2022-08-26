import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const deleteItemFromActivitiesList = async (
  userId,
  activityItems,
  itemIdToRemove,
  itemName
) => {
  let listWithActivityRemoved = activityItems.filter((item) => item.id !== itemIdToRemove);

  try {
    const postData = await setDoc(
      doc(db, userId, 'activities'),
      {
        weeklyActivities: listWithActivityRemoved,
      },
      { merge: true }
    );

    return listWithActivityRemoved;
  } catch (error) {
    console.log('ERROR DELETING DATA: HANDLE ERRORS FROM HERE', error);
  }
};
