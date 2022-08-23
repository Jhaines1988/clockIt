import { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../store/User-Context';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

function useActivitiesSnapShot(userId) {
  const userCtx = useContext(UserContext);

  const [usersCurrentActivities, setUsersCurrentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const weekOf = useRef(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, userId, 'activities'), (doc) => {
      console.log('!');
      setUsersCurrentActivities(doc.data().activities);
      userCtx.updateUserActivities(doc.data().activities);
      if (!weekOf.current) {
        weekOf.current = doc.data().weekOf;
      }
      setIsLoading(false);
    });

    return () => {
      console.log('here');
      unsubscribe();
    };
  }, [userId]);

  return [usersCurrentActivities, isLoading, weekOf];
}

export default useActivitiesSnapShot;
