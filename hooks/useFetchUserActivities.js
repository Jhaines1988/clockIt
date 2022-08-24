import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { UserContext } from '../store/User-Context';
function useFetchUserActivities(userId) {
  const userCtx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const activitiesOnLoad = await getDoc(doc(db, userId, 'activities'));
        if (activitiesOnLoad.exists()) {
          userCtx.dispatch({ type: 'INITIALIZE', payload: activitiesOnLoad.data().activities });
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
