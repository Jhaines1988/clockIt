import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

function useActivitiesSnapShot(addingActivities, userId) {
  const [usersCurrentActivities, setUsersCurrentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const weekOf = useRef(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, userId, 'activities'), (doc) => {
      console.log('!');
      setUsersCurrentActivities(doc.data().activities);
      if (!weekOf.current) {
        weekOf.current = doc.data().weekOf;
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [addingActivities, userId]);

  return [usersCurrentActivities, isLoading, weekOf];
}

export default useActivitiesSnapShot;
