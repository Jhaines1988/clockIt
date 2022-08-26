import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { addToHistory, instantiateNewActivitiesDocument } from '../db/writeClockitData';
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
          const activitiesArray = activitiesOnLoad.data().weeklyActivities;

          let expired = compareTimeStamp(activitiesOnLoad.data().expiresAt.valueOf());
          if (expired) {
            const newWeekArray = activitiesArray.map((item) => {
              const newWeekItem = {};
              newWeekItem.totalTime = 0;
              newWeekItem.id = item.id;
              newWeekItem.name = item.name;
              return newWeekItem;
            });
            // functions that add currentUserData to history and reset the data for the current week:

            await addToHistory(userId, activitiesOnLoad.data());
            await instantiateNewActivitiesDocument(userId, newWeekArray);
            // await instantiateNewWeek(userId);
            userCtx.dispatch({ type: 'INITIALIZE', payload: newWeekArray });
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
