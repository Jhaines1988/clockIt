import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import {
  addToHistory,
  instantiateNewActivitiesDocument,
  instantiateNewWeek,
} from '../db/writeClockitData';
import { db } from '../firebase';
import { UserContext } from '../store/User-Context';
import { compareTimeStamp } from '../utils/DateTimeHelpers/DateTimeHelpers';
function useFetchUserActivities(userId) {
  const userCtx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const activitiesOnLoad = await getDoc(doc(db, userId, 'activities'));
        if (activitiesOnLoad.exists()) {
          const activitiesArray = activitiesOnLoad.data().activities;

          let expired = compareTimeStamp(activitiesOnLoad.data().expiresAt.valueOf());
          if (expired) {
            const newData = activitiesArray.map((item) => {
              item.totalTime = 0;
              return item;
            });
            // functions that add currentUserData to history and reset the data for the current week:

            addToHistory(userId);
            instantiateNewActivitiesDocument(userId, newData);
            instantiateNewWeek(userId);
            userCtx.dispatch({ type: 'INITIALIZE', payload: newData });
          } else {
            userCtx.dispatch({ type: 'INITIALIZE', payload: activitiesArray });
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.log('ERROR GETTING ACTIVITIES ON LOAD', error);
      }
    }
    fetchActivities();
    return () => {};
  }, [userId]);
  return isLoading;
}

export default useFetchUserActivities;
