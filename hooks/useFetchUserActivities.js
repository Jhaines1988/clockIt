import { useState, useEffect, useContext, useRef } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../store/User-Context';
function useFetchUserActivities(userId) {
  const userCtx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const weekOf = useRef(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const activitiesOnLoad = await getDoc(doc(db, userId, 'activities'));
        if (activitiesOnLoad.exists()) {
          userCtx.dispatch({ type: 'INITIALIZE', payload: activitiesOnLoad.data().activities });
          if (!weekOf.current) {
            weekOf.current = activitiesOnLoad.data().weekOf;
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
  return [isLoading, weekOf];
}

export default useFetchUserActivities;
