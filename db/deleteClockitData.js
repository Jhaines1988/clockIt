import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase';

export const deleteItemFromActivitiesList = async (userId, items, itemIdToRemove, itemName) => {
  let listWithActivityRemoved = items.filter((item) => item.id !== itemIdToRemove);
  try {
    const postData = await setDoc(
      doc(db, userId, 'activities'),
      {
        activities: listWithActivityRemoved,
      },
      { merge: true }
    );

    await deleteItemFromCurrentWeek(userId, itemName);
    return listWithActivityRemoved;
  } catch (error) {
    console.log('ERROR DELETING DATA: HANDLE ERRORS FROM HERE', error);
  }
};

export const deleteItemFromCurrentWeek = async (userId, itemName) => {
  try {
    const itemRef = doc(db, userId, 'currentWeek');
    await updateDoc(itemRef, {
      [itemName]: deleteField(),
    });
  } catch (error) {}
};
