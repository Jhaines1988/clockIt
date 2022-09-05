import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { addToHistory, instantiateNewActivitiesDocument } from '../db/writeClockitData';
import { db } from '../firebase';
import { HistoryContext } from '../store/History-Context';
import { UserContext } from '../store/User-Context';

import { compareTimeStamp } from '../unused';
function useFetchUserActivities(userId) {
  const userCtx = useContext(UserContext);
  const historyCtx = useContext(HistoryContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        // await writeMockData(105);wr

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

            await addToHistory(activitiesOnLoad.data(), userId);

            await instantiateNewActivitiesDocument(userId, newWeekArray);
            userCtx.dispatch({ type: 'INITIALIZE', payload: newWeekArray });
            historyCtx.dispatch({ type: 'INITIALIZENAMES', payload: newWeekArray });
          } else {
            userCtx.dispatch({ type: 'INITIALIZE', payload: activitiesArray });
            historyCtx.dispatch({ type: 'INITIALIZENAMES', payload: activitiesArray });
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.log('ERROR GETTING ACTIVITIES ON LOAD', error);
      }
    }
    fetchActivities();
    // return () => {};
  }, [userId]);
  return isLoading;
}

export default useFetchUserActivities;
