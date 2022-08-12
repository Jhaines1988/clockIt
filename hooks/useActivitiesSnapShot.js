import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function useActivitiesSnapShot(addingActivities, userId) {
  const [usersCurrentActivities, setUsersCurrentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, userId, 'activities'), (doc) => {
      console.log('!');
      setUsersCurrentActivities(doc.data().activities);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [addingActivities, userId]);

  return [usersCurrentActivities, isLoading];
}

export default useActivitiesSnapShot;
